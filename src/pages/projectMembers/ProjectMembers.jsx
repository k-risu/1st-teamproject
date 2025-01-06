import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { isLogin } from "../../utils/isLogin";
import DeleteModal from "./Modal/DeleteModal";
import MoreOptionsModal from "./Modal/MoreOptionsModal";
import OpenTaskModal from "./Modal/OpenTaskModal";
import {
  Card,
  CardImg,
  CardTod,
  CheckedIcon,
  CrownIcon,
  MemberInfo,
  MemberInfoWrap,
  Members,
  MembersLayout,
  MembersLayoutTop,
  MembersSection,
  MoreOptionsIcon,
  ProjectTitle,
  Task,
  TaskList,
} from "./ProjectMembers.styles";

import { chunkMembers, handleCheck } from "./projectMemberUtils";

import React from "react";
import UnassignedMsg from "./Modal/UnassignedMsg";
import renderProgressBar from "./renderProgressBar";

// Memoize the modals using React.memo
const MoreOptionsModalMemo = React.memo(MoreOptionsModal);
const DeleteModalMemo = React.memo(DeleteModal);
const OpenTaskModalMemo = React.memo(OpenTaskModal);

import ToggleButton from "../../components/ToggleButton";

const ProjectMembers = () => {
  const location = useLocation();

  const [clickProjectNo, setclickProjectNo] = useState(
    location.state?.projectNo,
  );
  const [activeButton, setActiveButton] = useState("right");

  const [loading, setLoading] = useState(true); // 페이지 로딩 안되었을 때

  const [cookies] = useCookies(["signedUserNo"]); // 쿠키 가져오기

  // 프로젝트 정보
  const [projectTitle, setProjectTitle] = useState("");
  const [leaderNo, setLeaderNo] = useState(null);
  const [members, setMembers] = useState([]);

  // MoreOptionsModal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [moreOptionsModalId, setMoreOptionsModalId] = useState("");

  // MsgModal
  const [msgModal, setMsgModal] = useState(false);

  // DeleteModal
  const [deleteModalFor, setDeleteModalFor] = useState(false); // 유저 제외하기
  const [deleteModal, setDeleteModal] = useState(false); // 할일 삭제

  // OpenTaskModal
  const [modalMode, setModalMode] = useState("");
  const [openTaskModalFor, setOpenTaskModalFor] = useState(false);

  // 어떤 프로젝트인지 확인
  // const projectNo = 45; // 프랍스로 받을 예정
  const signedUserNo = cookies.signedUserNo; // 쿠키 데이터 받아오는거

  // 선택한 할일 정보
  const [selectedInfo, setSelectedInfo] = useState({
    userNo: null,
    nickname: "",
    task: null,
    modalMode: null,
    isTask: null,
  });

  // DeleteModal 열기 함수
  const openDeleteModal = useCallback((userNo) => {
    setDeleteModalFor(userNo);
    setDeleteModal(true);
    setMoreOptionsModalId(null);
  }, []);

  const navigate = useNavigate();

  // 프로젝트 데이터 가져오는 함수
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/project/${clickProjectNo}`, {
          params: { signedUserNo },
        });
        if (response.status === 200) {
          const { title, memberList, leaderNo } = response.data.project;
          setProjectTitle(title);
          setLeaderNo(leaderNo);
          setMembers(memberList);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        navigate("/schedule");
        setProjectTitle("");
        setLeaderNo("");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [clickProjectNo, signedUserNo]);

  // 로그인 확인
  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  /**
   * MoreOptionsModal의 좌표값을 계산하여 모달을 열기 위한 함수
   * @param {number|string} id - 열고자 하는 모달의 고유 ID
   * @param {Object} event - 클릭 이벤트 객체
   */
  const moreOptionsOpenModal = useCallback((id, event) => {
    const { top, left, width } = event.target.getBoundingClientRect();
    setModalPosition({
      top: top + window.scrollY,
      left: left + width,
    });
    setSelectedInfo((prevState) => ({
      ...prevState,
      userNo: id, // 선택된 member의 userNo로 상태 업데이트
      modalMode: "view", // 모달 모드를 설정
    }));
    setMoreOptionsModalId(id); // openModalId를 선택된 userNo로 설정
  }, []);

  const memberChunks = chunkMembers(members, 4); // 멤버 리스트를 4명씩 나누기

  // 카드 이미지 렌더링 함수
  const renderCardImg = useCallback((userNo, pic, nickname) => {
    if (pic !== null) {
      return (
        <CardImg
          src={`${import.meta.env.VITE_BASE_URL}/pic/user/${userNo}/${pic}`}
          alt={nickname}
        />
      );
    } else {
      return <CardImg src="/default_profile.png" noImage />;
    }
  }, []);

  // 멤버 정보 렌더링 함수
  const renderMemberInfoWrap = useCallback((member, leaderNo) => {
    return (
      <MemberInfoWrap>
        <h2>{member.lock === 1 ? "없음" : member.nickname}</h2>
        <span>{member.userNo === leaderNo ? "팀장" : "팀원"}</span>
      </MemberInfoWrap>
    );
  }, []);

  // MoreOptions 아이콘 렌더링 함수
  const renderMoreOptionsIcon = useCallback(
    (signedUserNo, member, leaderNo, moreOptionsOpenModal) => {
      if (signedUserNo === member.userNo || signedUserNo === leaderNo) {
        if (member.lock === 0) {
          return (
            <MoreOptionsIcon
              onClick={(e) => {
                console.log("클릭된 멤버의 e:", e); // 클릭된 멤버만 출력
                moreOptionsOpenModal(member.userNo, e); // 클릭한 멤버의 ID만 넘겨줌
              }}
            />
          );
        }
      }
      return null;
    },
    [],
  );

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
                  {leaderNo === member.userNo ? <CrownIcon /> : ""}
                  {renderCardImg(member.userNo, member.pic, member.nickname)}
                  {renderMemberInfoWrap(member, leaderNo)}
                  {renderMoreOptionsIcon(
                    signedUserNo,
                    member,
                    leaderNo,
                    moreOptionsOpenModal,
                  )}
                </MemberInfo>
                <TaskList>
                  {member.scheduleList.map((schedule) => (
                    <ul key={schedule.scheduleNo}>
                      <li
                        onClick={() => {
                          setSelectedInfo({
                            userNo: member.userNo,
                            nickname: member.nickname,
                            task: schedule,
                            modalMode: "view",
                          });
                          setModalMode(setSelectedInfo.modalMode);
                          setOpenTaskModalFor(member.userNo); // 선택된 유저의 userNo를 설정하여 모달을 엽니다.
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
                            handleCheck(
                              schedule.scheduleNo,
                              clickProjectNo,
                              signedUserNo,
                              setMembers,
                            );
                          }}
                        />
                      </li>
                    </ul>
                  ))}
                </TaskList>
                {renderProgressBar(member.scheduleList)}
              </Card>
            ) : (
              <Card key={index} dummy={true} />
            ),
          )}
        </Members>
      ))}
      <MoreOptionsModalMemo
        isOpenModal={moreOptionsModalId === selectedInfo.userNo}
        closeModal={() => setMoreOptionsModalId(null)}
        modalPosition={modalPosition}
        role={signedUserNo === leaderNo ? signedUserNo : false}
        signedUserNo={signedUserNo}
        memberRole={selectedInfo.userNo}
        onOpenDeleteModal={() => openDeleteModal(selectedInfo.userNo)}
        selectedInfo={selectedInfo}
        openTaskModalFor={() => setOpenTaskModalFor(selectedInfo.userNo)}
        setSelectedInfo={setSelectedInfo}
      />

      {deleteModalFor === selectedInfo.userNo && (
        <DeleteModalMemo
          projectNo={clickProjectNo}
          signedUserNo={signedUserNo}
          allCloseModal={() => {
            setDeleteModalFor(null),
              setSelectedInfo((prevState) => ({
                ...prevState,
                isTask: false,
              }));
          }}
          isLeader={signedUserNo === leaderNo}
          memberRole={selectedInfo.userNo}
          scheduleNo={selectedInfo.task?.scheduleNo}
          setMembers={setMembers}
          setMsgModal={setMsgModal}
          isTask={selectedInfo.isTask}
          setIsTask={setSelectedInfo}
          closeTaskModalFor={() => {
            setOpenTaskModalFor(null),
              setSelectedInfo((prevState) => ({
                ...prevState,
                isTask: false,
              }));
          }}
        />
      )}

      {openTaskModalFor === selectedInfo.userNo && (
        <OpenTaskModalMemo
          openTaskModalFor={openTaskModalFor === selectedInfo.userNo}
          closeTaskModalFor={() => setOpenTaskModalFor(null)}
          signedUserNo={signedUserNo}
          projectNo={clickProjectNo}
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
          isLeader={signedUserNo === leaderNo}
          setMembers={setMembers}
          members={members}
          onOpenDeleteModal={() => openDeleteModal(selectedInfo.userNo)}
        />
      )}
    </MembersLayout>
  );
};

export default ProjectMembers;
