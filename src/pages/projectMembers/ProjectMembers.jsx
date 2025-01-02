import axios from "axios";
import { useEffect, useState } from "react";
import AddNewTaskModal from "./AddNewTask";
import MoreOptionsModal from "./MoreOptionsModal";
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
  TaskList,
} from "./ProjectMembers.styles";
import UnassignedMsg from "./UnassignedMsg";
import renderProgressBar from "./renderProgressBar";
import TaskDetails from "./TaskDetails";

function ProjectMembers() {
  const projectNo = 1;
  const signedUserNo = 2;
  const [projectTitle, setProjectTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [leaderNo, setLeaderNo] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [msgModal, setMsgModal] = useState(false);
  const [openTaskModalFor, setOpenTaskModalFor] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectNickname, setSelectNickname] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/project/${projectNo}`, {
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
        setProjectTitle("단단무지");
        setLeaderNo(1);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [projectNo, signedUserNo]);

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

          const projectResponse = await axios.get(`/api/project/${projectNo}`, {
            params: { signedUserNo },
          });

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
      const response = await axios.get(`/api/project/${projectNo}`, {
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

  const openModal = (id, event) => {
    const { top, left, width } = event.target.getBoundingClientRect();
    setModalPosition({
      top: top + window.scrollY,
      left: left + width,
    });
    setOpenModalId(id);
  };

  const closeTaskModal = () => {
    setOpenTaskModalFor(null);
    setSelectedTask(null);
    setModalMode(null);

    refreshData();
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

  if (loading) {
    return <div>데이터를 로딩 중입니다...</div>;
  }

  return (
    <MembersLayout>
      <MembersLayoutTop>
        <ProjectTitle>
          <div>title</div>
          <span>{projectTitle}</span>의 구성원
        </ProjectTitle>
        <MembersSection>
          <MembersSectionBT
            type="button"
            sideProps={true}
            isOpenModal={openModalId}
            closeModal={() => setMsgModal(false)}
            onClick={() => setMsgModal(true)}
          >
            대시보드
          </MembersSectionBT>
          <MembersSectionBT type="button" sideProps={false}>
            구성원
          </MembersSectionBT>
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
                    <h2>{member.nickname}</h2>
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
                          <span>{schedule.content}</span>
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
                  projectNo={projectNo}
                  onAddNewTask={() => openTaskModal(member.userNo)}
                />
                {openTaskModalFor === member.userNo && (
                  <AddNewTaskModal
                    isOpen={openTaskModalFor === member.userNo}
                    closeModal={closeTaskModal}
                    projectNo={projectNo}
                    signedUserNo={signedUserNo}
                    memberRole={member.userNo}
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
        />
      )}

      {selectedTask && modalMode === "edit" && (
        <AddNewTaskModal
          isOpen={true}
          closeModal={closeTaskModal}
          initialData={selectedTask}
          projectNo={projectNo}
          signedUserNo={signedUserNo}
          scheduleNo={selectedTask.scheduleNo}
          userNo={selectedUserNo}
          mode="edit"
        />
      )}
    </MembersLayout>
  );
}

export default ProjectMembers;
