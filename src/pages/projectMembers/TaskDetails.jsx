import axios from "axios";
import { useEffect, useState } from "react";
import { ModalInput } from "./AddNewtask.styles";
import {
  BtWrap,
  ChangeIcon,
  DeleteIcon,
  ModalContent,
  ModalOverlay,
  ModalText,
  UserinfoWrap,
} from "./TaskDetails.styles";

const TaskDetails = ({
  scheduleNo,
  closeModal,
  onEdit,
  signedUserNo,
  nickname,
  openChangeTaskUserModal,
  openDeleteModal,
}) => {
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`/api/project/schedule`, {
          params: { scheduleNo, signedUserNo }, // 로그인한 사용자 ID
        });
        if (response.status === 200 && response.data.code === "OK") {
          setTaskData(response.data);
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

    fetchTaskDetails();
  }, [scheduleNo]);
  const editBt = (taskData) => {
    taskData = { ...taskData, scheduleNo };
    onEdit(taskData);
  };

  if (loading) {
    return (
      <ModalOverlay onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <p>로딩 중...</p>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (error) {
    return (
      <ModalOverlay onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <p>{error}</p>
          <button onClick={closeModal}>닫기</button>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <UserinfoWrap>
          <h2>{nickname}</h2>
          <div>
            <ChangeIcon onClick={() => openChangeTaskUserModal(taskData)} />
            <DeleteIcon onClick={openDeleteModal} />
          </div>
        </UserinfoWrap>
        <ModalInput readOnly value={taskData.content} />
        <ModalText readOnly value={taskData.detail || ""} />
        <BtWrap>
          <button onClick={() => editBt(taskData)}>수정</button>
          <button onClick={closeModal}>닫기</button>
        </BtWrap>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TaskDetails;
