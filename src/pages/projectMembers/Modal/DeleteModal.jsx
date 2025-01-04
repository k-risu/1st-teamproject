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
  const handleDeleteTask = async () => {
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
  };

  const handleLeaveProject = async () => {
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
  };

  return (
    <ModalOverlay
      onClick={() => {
        allCloseModal,
          setIsTask((prevState) => ({
            ...prevState,
            isTask: false,
          }));
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {isTask === true ? (
          <h2>이 할일을 삭제하시겠습니까?</h2>
        ) : isLeader ? (
          <h2>프로젝트에서 제외하시겠습니까?</h2>
        ) : (
          <h2>프로젝트를 나가시겠습니까?</h2>
        )}
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
