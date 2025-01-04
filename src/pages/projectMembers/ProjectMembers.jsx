import axios from "axios";
import { useEffect, useState } from "react";
import AddNewTaskModal from "./AddNewTask";
import MoreOptionsModal from "./MoreOptionsModal";
import { useCookies } from "react-cookie";

import {
  Card,
  CardImg,
  CardTod,
  CheckedIcon,
  MemberInfo,
  MemberInfoWrap,
  Members,
  MembersLayout,
  MembersLayoutTop,
  MembersSection,
  MembersSectionBT,
  MoreOptionsIcon,
  ProjectTitle,
  Task,
  TaskList,
} from "./ProjectMembers.styles";
import UnassignedMsg from "./UnassignedMsg";
import renderProgressBar from "./renderProgressBar";
import TaskDetails from "./TaskDetails";
import ChangeTaskUser from "./Modal/ChangeTaskUser";
import DeleteModal from "./Modal/DeleteModal";
import { useLocation, useNavigate } from "react-router-dom";
import { isLogin } from "../../utils/isLogin";
import ToggleButton from "../../components/ToggleButton";

const ProjectMembers = () => {
  const location = useLocation();

  const [clickProjectNo, setclickProjectNo] = useState(
    location.state?.projectNo,
  );

  const [cookies] = useCookies(["signedUserNo"]); // 쿠키 가져오기
  // const signedUserNo = 2;
  const [projectTitle, setProjectTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [leaderNo, setLeaderNo] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [msgModal, setMsgModal] = useState(false);
  const [openTaskModalFor, setOpenTaskModalFor] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteModalFor, setDeleteModalFor] = useState(null);

  const [changeTaskUserModal, setChangeTaskUserModal] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectNickname, setSelectNickname] = useState(null);

  const [isTask, setIsTask] = useState(null);

  const [activeButton, setActiveButton] = useState("right");

  const signedUserNo = cookies.signedUserNo; // 쿠키에서 signedUserNo 값 추출

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/project/${clickProjectNo}`, {
          params: { signedUserNo },
        });
        if (response.status === 200) {
          const { title, memberList, leaderNo } = response.data.project;
          setProjectTitle(title);
          setMembers(memberList);
          setLeaderNo(leaderNo);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        setProjectTitle("");
        setLeaderNo("");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [clickProjectNo, signedUserNo]);

  const navigate = useNavigate();

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  const handleCheck = async (scheduleNo) => {
    try {
      const response = await axios.post(
        `/api/project/schedule/${scheduleNo}`,
        null,
        {
          params: {
            signedUserNo,
            scheduleNo,
          },
        },
      );
      if (response.status === 200) {
        if (response.data.code === "NF") {
          console.log("권한없음");
        } else {
          console.log("체크 업데이트 성공:", response.data);

          const projectResponse = await axios.get(
            `/api/project/${clickProjectNo}`,
            {
              params: { signedUserNo },
            },
          );

          if (projectResponse.status === 200) {
            const { memberList } = projectResponse.data.project;
            setMembers(memberList);
          }
        }
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const refreshData = async () => {
    try {
      const response = await axios.get(`/api/project/${clickProjectNo}`, {
        params: { signedUserNo },
      });
      if (response.status === 200) {
        const { memberList } = response.data.project;
        setMembers(memberList || []);
      }
    } catch (error) {
      console.error("데이터 갱신 오류:", error);
    }
  };
  const checkUnassignedTasks = async () => {
    try {
      const response = await axios.get(`/api/project/${clickProjectNo}`, {
        params: { signedUserNo },
      });

      console.log("API 응답 데이터:", response.data); // 구조 확인용

      if (response.status === 200) {
        const { memberList } = response.data.project; // project 내부의 memberList를 직접 가져옴
        setMembers(memberList || []); // 멤버 리스트 상태 업데이트

        // 'lock === 1'이고 할일이 남아 있는 팀원 확인
        const unassignedMember = memberList.find(
          (member) =>
            member.lock === 1 &&
            Array.isArray(member.scheduleList) &&
            member.scheduleList.filter(
              (item) => item !== null && item !== undefined,
            ).length > 0, // 유효한 값만 확인
        );

        if (unassignedMember) {
          setMsgModal(true); // UnassignedMsg 표시
        }
      }
    } catch (error) {
      console.error("Unassigned 상태 확인 오류:", error);
    }
  };

  const openModal = (id, event) => {
    const { top, left, width } = event.target.getBoundingClientRect();
    setModalPosition({
      top: top + window.scrollY,
      left: left + width,
    });
    setOpenModalId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(null);
    setSelectedTask(null);
    setDeleteModalFor(null);
  };

  const closeTaskModal = () => {
    setOpenTaskModalFor(null);
    setSelectedTask(null);
    setModalMode(null);

    if (changeTaskUserModal === false) refreshData();
  };

  const openTaskModal = (memberNo) => {
    setOpenModalId(null);
    setOpenTaskModalFor(memberNo);
  };

  const msgCloseModal = () => setMsgModal(false);

  const chunkMembers = (members, chunkSize) => {
    const result = [];
    while (members.length % chunkSize !== 0) {
      members.push(null);
    }
    for (let i = 0; i < members.length; i += chunkSize) {
      const chunk = members.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  };

  const openTaskModalForEdit = (taskData) => {
    setSelectedTask(taskData);
    setModalMode("edit");
  };

  const memberChunks = chunkMembers(members, 4);

  const openChangeTaskUserModal = (taskData) => {
    setChangeTaskUserModal(taskData); // ChangeTaskUser 모달을 열기 위해 데이터 저장
    // setSelectedTask(null); // TaskDetails 모달 닫기
    setModalMode(null); // 다른 모달 닫기
    setOpenModalId(null); // MoreOptionsModal 닫기
  };
  const openDeleteModal = (userNo) => {
    setDeleteModalFor(userNo);
    setDeleteModal(true);
    // console.log(signedUserNo, leaderNo);
  };

  if (loading) {
    return <div>데이터를 로딩 중입니다...</div>;
  }

  const goProjectDashBoard = (e) => {
    console.log(e);
    setActiveButton("left");

    navigate(`/project/dashboard`, {
      state: {
        projectNo: e,
      },
    });
  };

  return (
    <MembersLayout>
      <MembersLayoutTop>
        <ProjectTitle>
          <div>title</div>
          <span>{projectTitle}</span>의 구성원
        </ProjectTitle>
        <MembersSection>
          {/* <MembersSectionBT
            onClick={() => navigate("/project")}
            type="button"
            sideProps={true}
            // isOpenModal={openModalId}
            // closeModal={() => setMsgModal(false)}
            // onClick={() => setMsgModal(true)}
          >
            대시보드
          </MembersSectionBT>
          <MembersSectionBT type="button" sideProps={false}>
            구성원
          </MembersSectionBT> */}
          <ToggleButton
            leftLabel="대시보드"
            rightLabel="구성원"
            activeButton={activeButton}
            onLeftClick={() => goProjectDashBoard(clickProjectNo)}
          />
        </MembersSection>
      </MembersLayoutTop>
      {msgModal && (
        <UnassignedMsg
          isOpen={msgModal}
          closeModal={() => setMsgModal(false)}
        />
      )}
      {memberChunks.map((chunk, chunkIndex) => (
        <Members key={chunkIndex}>
          {chunk.map((member, index) =>
            member ? (
              <Card key={member.userNo || index}>
                <CardTod />
                <MemberInfo>
                  {member.pic !== null ? (
                    <CardImg
                      src={`${import.meta.env.VITE_BASE_URL}/pic/user/${member.userNo}/${member.pic}`}
                      alt={member.nickname}
                    />
                  ) : (
                    <CardImg noImage />
                  )}
                  <MemberInfoWrap>
                    <h2>{member.lock === 1 ? "없음" : member.nickname}</h2>
                    {console.log(member.lock)}
                    <span>{member.userNo === leaderNo ? "팀장" : "팀원"}</span>
                  </MemberInfoWrap>
                  {signedUserNo === member.userNo ||
                  signedUserNo === leaderNo ? (
                    <MoreOptionsIcon
                      onClick={(e) => openModal(member.userNo, e)}
                    />
                  ) : null}
                </MemberInfo>
                <TaskList>
                  {member.scheduleList.map((schedule) => (
                    <ul key={schedule.scheduleNo}>
                      <li
                        onClick={() => {
                          setSelectedUserNo(member.userNo);
                          setSelectNickname(member.nickname);
                          setSelectedTask(schedule);
                          setModalMode("view");
                        }}
                      >
                        <div>
                          <Task memberLock={member.lock}>
                            {schedule.content}
                          </Task>
                        </div>
                        <CheckedIcon
                          checked={schedule.checked}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheck(schedule.scheduleNo);
                          }}
                        />
                      </li>
                    </ul>
                  ))}
                </TaskList>
                {renderProgressBar(member.scheduleList)}
                <MoreOptionsModal
                  isOpenModal={openModalId === member.userNo}
                  closeModal={() => setOpenModalId(null)}
                  modalPosition={modalPosition}
                  role={signedUserNo === leaderNo ? signedUserNo : false}
                  signedUserNo={signedUserNo}
                  memberRole={member.userNo}
                  projectNo={clickProjectNo}
                  onOpenDeleteModal={() => openDeleteModal(member.userNo)}
                  onAddNewTask={() => openTaskModal(member.userNo)}
                />
                {deleteModalFor && deleteModalFor === member.userNo && (
                  <DeleteModal
                    projectNo={clickProjectNo}
                    signedUserNo={signedUserNo}
                    refreshData={refreshData}
                    allCloseModal={closeDeleteModal}
                    isLeader={signedUserNo === leaderNo}
                    memberRole={member.userNo}
                    checkUnassignedTasks={checkUnassignedTasks}
                  />
                )}
                {openTaskModalFor === member.userNo && (
                  <AddNewTaskModal
                    isOpen={openTaskModalFor === member.userNo}
                    closeModal={closeTaskModal}
                    projectNo={clickProjectNo}
                    signedUserNo={signedUserNo}
                    memberRole={member.userNo}
                    refreshData={refreshData}
                    isLeader={signedUserNo === leaderNo}
                  />
                )}
              </Card>
            ) : (
              <Card key={index} dummy={true} />
            ),
          )}
        </Members>
      ))}
      {selectedTask && modalMode === "view" && (
        <TaskDetails
          scheduleNo={selectedTask.scheduleNo}
          closeModal={closeTaskModal}
          onEdit={openTaskModalForEdit}
          signedUserNo={signedUserNo}
          nickname={selectNickname}
          openChangeTaskUserModal={openChangeTaskUserModal}
          openDeleteModal={openDeleteModal}
          isLeader={signedUserNo === leaderNo}
          setIsTask={setIsTask}
        />
      )}

      {selectedTask && modalMode === "edit" && (
        <AddNewTaskModal
          isOpen={true}
          closeModal={closeTaskModal}
          initialData={selectedTask}
          projectNo={clickProjectNo}
          signedUserNo={signedUserNo}
          scheduleNo={selectedTask.scheduleNo}
          refreshData={refreshData}
          userNo={selectedUserNo}
          mode="edit"
        />
      )}
      {selectedTask && changeTaskUserModal && (
        <ChangeTaskUser
          selectedTask={selectedTask}
          projectNo={clickProjectNo}
          signedUserNo={signedUserNo}
          scheduleNo={selectedTask.scheduleNo}
          members={members}
          refreshData={refreshData}
          closeModal={() => setChangeTaskUserModal(null)} // 모달 닫기 핸들러
        />
      )}
      {selectedTask && deleteModal && (
        <DeleteModal
          scheduleNo={selectedTask.scheduleNo}
          signedUserNo={signedUserNo}
          refreshData={refreshData}
          allCloseModal={closeDeleteModal}
          setisTask={setIsTask}
          isTask={isTask}
          closeModal={() => setDeleteModal(null)}
        />
      )}
    </MembersLayout>
  );
};

export default ProjectMembers;
