import { useState } from "react";
import {
  ModalContent,
  ModalOverlay,
  OptionButton,
  Separator,
} from "./MoreOptionsModal.styles";
const AddNewTaskModal = ({ isOpen, closeModal, onSubmit }) => {
  const [taskContent, setTaskContent] = useState("");
  const handleChange = (e) => {
    setTaskContent(e.target.value);
  };
  const handleSubmit = () => {
    if (taskContent.trim()) {
      onSubmit(taskContent);
      closeModal();
    }
  };
  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>새 할일 등록</h2>
        <input
          type="text"
          value={taskContent}
          onChange={handleChange}
          placeholder="할일을 입력하세요"
        />
        <button onClick={handleSubmit}>등록</button>
        <Separator />
        <OptionButton onClick={closeModal}>취소</OptionButton>
      </ModalContent>
    </ModalOverlay>
  );
};
export default AddNewTaskModal;
