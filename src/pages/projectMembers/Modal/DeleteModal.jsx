import { useMemo, useCallback } from "react";
import { checkUnassignedTasks, refreshData } from "../projectMemberUtils";
import { AlertIcon, ModalContent, ModalOverlay } from "./DeleteModal.styles";
import axios from "axios";

const DeleteModal = ({
  allCloseModal,
  scheduleNo,
  signedUserNo,
  memberRole,
  isLeader,
  projectNo,
  isTask,
  setIsTask,
  setMembers,
  setMsgModal,
  closeTaskModalFor,
}) => {
  /**
   * 조건부 메시지를 useMemo로 메모이제이션
   */
  const modalMessage = useMemo(() => {
    if (isTask === true) {
      return "이 할일을 삭제하시겠습니까?";
    } else if (isLeader) {
      return "프로젝트에서 제외하시겠습니까?";
    } else {
      return "프로젝트를 나가시겠습니까?";
    }
  }, [isTask, isLeader]);

  /**
   * 할 일을 삭제하는 함수.
   * API 요청을 통해 해당 할 일을 삭제하고, 삭제 성공 시 상태를 업데이트하고 데이터를 새로 고칩니다.
   * @returns {Promise<void>}
   */
  const handleDeleteTask = useCallback(async () => {
    try {
      const response = await axios.delete(`/api/project/schedule`, {
        data: { scheduleNo, signedUserNo },
      });
      if (response.status === 200 && response.data.code === "OK") {
        console.log("항목이 삭제 되었습니다.");
        setIsTask((prevState) => ({
          ...prevState,
          isTask: false,
        }));
        allCloseModal();
        closeTaskModalFor();
        refreshData(projectNo, signedUserNo, setMembers);
      } else {
        console.log("삭제 하지 못했습니다.");
      }
    } catch (err) {
      console.log("API 호출 중 오류가 발생했습니다.");
      console.log(err);
    }
  }, [
    scheduleNo,
    signedUserNo,
    setIsTask,
    allCloseModal,
    closeTaskModalFor,
    projectNo,
    setMembers,
  ]);

  /**
   * 프로젝트에서 나가거나 제외하는 함수.
   * API 요청을 통해 프로젝트에서 나가거나 특정 멤버를 제외하고, 이후 할 일에 대한 처리와 데이터를 새로 고칩니다.
   * @returns {Promise<void>}
   */
  const handleLeaveProject = useCallback(async () => {
    try {
      const response = await axios.patch(`/api/project`, {
        signedUserNo,
        targetUserNo: memberRole,
        projectNo: projectNo,
      });
      if (response.status === 200 && response.data.code === "OK") {
        console.log("프로젝트에서 나갔습니다.");
        console.log(projectNo, signedUserNo, setMembers);

        await checkUnassignedTasks(
          projectNo,
          signedUserNo,
          setMembers,
          setMsgModal,
        );
        allCloseModal();
        refreshData(projectNo, signedUserNo, setMembers);
      } else {
        console.log("나가지 못했습니다.");
      }
    } catch (err) {
      console.log("API 호출 중 오류가 발생했습니다.", err);
    }
  }, [
    signedUserNo,
    memberRole,
    projectNo,
    setMembers,
    setMsgModal,
    allCloseModal,
  ]);

  return (
    <ModalOverlay
      onClick={() => {
        allCloseModal();
        setIsTask((prevState) => ({
          ...prevState,
          isTask: false,
        }));
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{modalMessage}</h2>
        <AlertIcon />
        <div>
          {isTask === true ? (
            <button onClick={handleDeleteTask}>삭제</button>
          ) : isLeader ? (
            <button onClick={handleLeaveProject}>제외</button>
          ) : (
            <button onClick={handleLeaveProject}>나가기</button>
          )}
          <button onClick={allCloseModal}>취소</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;
