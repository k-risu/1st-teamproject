import { useState, useEffect } from "react";
import axios from "axios";
import { refreshData } from "../projectMemberUtils";
import {
  BtWrap,
  ChangeIcon,
  CheckedIcon,
  DeleteIcon,
  EditIcon,
  IconWrap,
  MembersWrap,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalOverlay,
  ModalText,
  NoImg,
  UserWrap,
} from "./OpenTaskModal.styles";

/**
 * OpenTaskModal 컴포넌트
 * @param {boolean} openTaskModalFor - 모달이 열려있는지 여부
 * @param {function} closeTaskModalFor - 모달을 닫는 함수
 * @param {function} onOpenDeleteModal - 삭제 모달을 여는 함수
 * @param {number} signedUserNo - 로그인한 사용자의 번호
 * @param {number} projectNo - 프로젝트 번호
 * @param {object} selectedInfo - 선택된 정보 (할 일 관련)
 * @param {function} setSelectedInfo - 선택된 정보 상태 변경 함수
 * @param {boolean} isLeader - 사용자가 팀 리더인지 여부
 * @param {function} setMembers - 팀 멤버 상태 변경 함수
 * @param {Array} members - 팀 멤버 목록
 */
const OpenTaskModal = ({
  openTaskModalFor,
  closeTaskModalFor,
  onOpenDeleteModal,
  signedUserNo,
  projectNo,
  selectedInfo,
  setSelectedInfo,
  isLeader,
  setMembers,
  members,
}) => {
  const [taskContent, setTaskContent] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 할 일 내용 상태 변경 함수
   * @param {object} e - 이벤트 객체
   */
  const handleChangeContent = (e) => setTaskContent(e.target.value);

  /**
   * 할 일 상세 내용 상태 변경 함수
   * @param {object} e - 이벤트 객체
   */
  const handleChangeDetail = (e) => setTaskDetail(e.target.value);

  /**
   * 팀원 선택 상태 변경 함수
   * @param {number} userNo - 선택된 팀원의 번호
   */
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 팀원

  useEffect(() => {
    // openTaskModalFor가 true일 때만 모달을 렌더링해야 함
    if (!openTaskModalFor) return;

    // 새로운 할 일 등록 모드일 경우 상태 초기화
    if (selectedInfo.modalMode === "add") {
      setTaskContent("");
      setTaskDetail("");
      setLoading(false);
      return;
    }

    /**
     * 할 일 상세 정보를 가져오는 함수
     */
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`/api/project/schedule`, {
          params: { scheduleNo: selectedInfo.task.scheduleNo, signedUserNo },
        });
        if (response.status === 200 && response.data.code === "OK") {
          setTaskContent(response.data.content || "");
          setTaskDetail(response.data.detail || "");
        } else {
          setError("데이터를 가져오지 못했습니다.");
        }
      } catch (err) {
        setError("API 호출 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedInfo.modalMode !== "add") {
      fetchTaskDetails();
    }
  }, []); // openTaskModalFor, selectedInfo에 따라 리렌더링

  /**
   * 폼 제출 처리 함수
   * @param {object} taskData - 할 일 데이터를 포함한 객체
   */
  const handleSubmit = async () => {
    if (!taskContent.trim()) return;

    let taskData = {
      signedUserNo: signedUserNo,
      sighInUserNo: signedUserNo,
      scheduleUserNo: selectedInfo.userNo,
      projectNo,
      content: taskContent,
      detail: taskDetail,
    };

    try {
      if (selectedInfo.modalMode === "add") {
        const response = await axios.post("/api/project/schedule", taskData);
        if (response.status === 200) {
          refreshData(projectNo, signedUserNo, setMembers);
        }
      } else if (selectedInfo.modalMode === "edit") {
        taskData = {
          ...taskData,
          scheduleUserNo: selectedInfo.userNo,
          scheduleNo: selectedInfo.task.scheduleNo,
        };
        const response = await axios.put(`/api/project/schedule`, taskData);
        if (response.status >= 200 && response.status < 300) {
          refreshData(projectNo, signedUserNo, setMembers);
        }
      } else {
        try {
          taskData = {
            ...taskData,
            scheduleNo: selectedInfo.task.scheduleNo, // 기존 task의 scheduleNo 사용
            signedUserNo: signedUserNo, // 사용자 정보
            scheduleUserNo: selectedUser, // 팀원 정보
            projectNo: projectNo, // 외부에서 받은 projectNo 사용
            content: taskContent, // 입력된 할 일 내용
            detail: taskDetail, // 입력된 상세 내용
          };
          const response = await axios.put("/api/project/schedule", taskData);

          if (response.status === 200) {
            console.log(response);
            console.log(taskData);
            refreshData(projectNo, signedUserNo, setMembers);
          }
        } catch (error) {
          console.log(
            selectedInfo.task,
            signedUserNo,
            selectedInfo.userNo,
            projectNo,
          );

          console.error("할당 변경 실패:", error);
        }
      }
      closeTaskModalFor();
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  /**
   * 모달의 제목을 결정하는 함수
   * @returns {string} 모달의 제목
   */
  const getModalTitle = () => {
    switch (selectedInfo.modalMode) {
      case "add":
        return "할 일 등록";
      case "edit":
        return "할 일 수정";
      case "view":
        return "할 일 상세보기";
      default:
        return "변경할 팀원 선택";
    }
  };

  /**
   * 모달에 표시할 버튼을 렌더링하는 함수
   * @returns {JSX.Element} 버튼 UI
   */
  const renderButtons = () => {
    if (selectedInfo.modalMode === "view") {
      return (
        <BtWrap>
          <button onClick={closeTaskModalFor}>닫기</button>
        </BtWrap>
      );
    }
    if (selectedInfo.modalMode === "change") {
      return (
        <BtWrap>
          <button onClick={handleSubmit}>
            {selectedInfo.modalMode === "add" ? "변경" : "완료"}
          </button>
          <button onClick={closeTaskModalFor}>취소</button>
        </BtWrap>
      );
    }

    return (
      <BtWrap>
        <button onClick={handleSubmit}>
          {selectedInfo.modalMode === "add" ? "등록" : "완료"}
        </button>
        <button onClick={closeTaskModalFor}>취소</button>
      </BtWrap>
    );
  };

  /**
   * 팀원 변경 UI를 렌더링하는 함수
   * @returns {JSX.Element} 팀원 변경 UI
   */
  const renderChangeUserUI = () => {
    return (
      <>
        <ul>
          <UserWrap>
            {members
              .filter((member) => member !== null && member.lock !== 1) // lock이 1인 멤버 제외
              .map((member, memberIndex) => (
                <MembersWrap
                  key={memberIndex}
                  onClick={() => setSelectedUser(member.userNo)} // 팀원 선택
                  style={{
                    backgroundColor:
                      selectedUser === member.userNo ? "#d3f9d8" : "#f4f4f4",
                  }}
                >
                  <span>{member.nickname}</span>
                  {member.pic ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/pic/user/${member.userNo}/${member.pic}`}
                    />
                  ) : (
                    <NoImg />
                  )}
                  <CheckedIcon
                    checked={selectedUser === member.userNo} // 선택된 상태 표시
                  />
                </MembersWrap>
              ))}
          </UserWrap>
        </ul>
        {renderButtons()}
      </>
    );
  };

  // openTaskModalFor가 false일 경우 모달을 렌더링하지 않음
  if (!openTaskModalFor || loading) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{getModalTitle()}</h2>
          {selectedInfo.modalMode === "change" ? (
            ""
          ) : (
            <IconWrap>
              {/* 리더일 때 무조건 EditIcon, ChangeIcon, DeleteIcon이 나옴 */}
              {isLeader && (
                <>
                  <EditIcon
                    onClick={() =>
                      setSelectedInfo((prevState) => ({
                        ...prevState,
                        modalMode: "edit",
                      }))
                    }
                  />
                  <ChangeIcon
                    onClick={() =>
                      setSelectedInfo((prevState) => ({
                        ...prevState,
                        modalMode: "change",
                      }))
                    }
                  />
                  <DeleteIcon
                    onClick={() => {
                      setSelectedInfo((prevState) => ({
                        ...prevState,
                        isTask: true,
                      }));
                      onOpenDeleteModal(); // 삭제 모달 열기
                    }}
                  />
                </>
              )}

              {/* 리더가 아니면서 signedUserNo === selectedInfo.userNo일 때만 EditIcon, DeleteIcon */}
              {!isLeader && signedUserNo === selectedInfo.userNo && (
                <>
                  <EditIcon
                    onClick={() =>
                      setSelectedInfo((prevState) => ({
                        ...prevState,
                        modalMode: "edit",
                      }))
                    }
                  />
                  <DeleteIcon
                    onClick={() => {
                      setSelectedInfo((prevState) => ({
                        ...prevState,
                        isTask: true,
                      }));
                      onOpenDeleteModal(); // 삭제 모달 열기
                    }}
                  />
                </>
              )}
            </IconWrap>
          )}
        </ModalHeader>
        {selectedInfo.modalMode === "change" ? (
          renderChangeUserUI()
        ) : (
          <>
            <ModalInput
              type="text"
              value={taskContent}
              onChange={handleChangeContent}
              placeholder="할 일을 입력하세요"
              disabled={selectedInfo.modalMode === "view"}
            />
            <ModalText
              as="textarea"
              value={taskDetail}
              onChange={handleChangeDetail}
              placeholder="상세 내용을 입력하세요"
              disabled={selectedInfo.modalMode === "view"}
            />
            {renderButtons()}
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default OpenTaskModal;
