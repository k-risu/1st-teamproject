import React, { useState, useEffect } from "react";
import {
  ModalContent,
  ModalInput,
  ModalOverlay,
  ModalText,
} from "./AddNewtask.styles";
import axios from "axios";

const AddTaskModal = ({
  isOpen,
  closeModal,
  mode = "add", // "add" | "edit" | "view"
  initialData = null, // 수정 또는 상세보기용 데이터
  // onSubmit,
  projectNo,
  signedUserNo,
  memberRole,
  userNo,
  scheduleNo,
  refreshData,
}) => {
  const [taskContent, setTaskContent] = useState("");
  const [taskDetail, setTaskDetail] = useState("");

  useEffect(() => {
    if (initialData && (mode === "edit" || mode === "view")) {
      setTaskContent(initialData.content || "");
      setTaskDetail(initialData.detail || "");
    } else {
      setTaskContent("");
      setTaskDetail("");
    }
  }, [initialData, mode]);

  const handleChangeContent = (e) => setTaskContent(e.target.value);
  const handleChangeDetail = (e) => setTaskDetail(e.target.value);

  const handleSubmit = async () => {
    if (!taskContent.trim()) return;

    let taskData = {
      sighInUserNo: signedUserNo,
      scheduleUserNo: memberRole,
      projectNo,
      content: taskContent,
      detail: taskDetail,
    };

    try {
      if (mode === "add") {
        // Create new task
        const response = await axios.post("/api/project/schedule", taskData);
        if (response.status === 200) {
          console.log(taskData);
          console.log("할 일 등록 성공:", response.data);
          refreshData();
          // onSubmit(response.data.newTask, memberRole); // 새 할 일 반환
        }
      } else if (mode === "edit") {
        // Update existing task
        console.log(userNo);

        taskData = {
          ...taskData,
          scheduleUserNo: userNo,
          scheduleNo: scheduleNo,
        };
        console.log(taskData);

        const response = await axios.put(`/api/project/schedule`, taskData);
        if (response.status === 200) {
          console.log("할 일 수정 성공:", response.data);
          console.log(response.data);

          // onSubmit(taskData); // 수정된 할 일 반환
        }
      }
      closeModal();
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>
          {mode === "add"
            ? "할 일 등록"
            : mode === "edit"
              ? "할 일 수정"
              : "할 일 상세보기"}
        </h2>
        <ModalInput
          type="text"
          value={taskContent}
          onChange={handleChangeContent}
          placeholder="할 일을 입력하세요"
          disabled={mode === "view"} // 상세보기일 때 비활성화
        />
        <ModalText
          as="textarea"
          value={taskDetail}
          onChange={handleChangeDetail}
          placeholder="상세 내용을 입력하세요"
          disabled={mode === "view"} // 상세보기일 때 비활성화
        />
        {mode !== "view" && (
          <div>
            <button onClick={handleSubmit}>
              {mode === "add" ? "등록" : "완료"}
            </button>
            <button onClick={closeModal}>취소</button>
          </div>
        )}
        {mode === "view" && (
          <div>
            <button onClick={closeModal}>닫기</button>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTaskModal;
