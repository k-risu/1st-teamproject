import { useEffect } from "react";
import { AlertIcon, ModalOverlay } from "./UnassignedMsg.styles";

const UnassignedMsg = ({ isOpen, closeModal }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeModal(); // 3초 뒤에 모달 닫기
      }, 3000);

      // 컴포넌트가 언마운트되거나 isOpen이 false로 바뀌면 타이머를 정리합니다.
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]);
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <div>
        <AlertIcon />
        <span>아직 담당자가 부여되지 않는 목표가 존재합니다.</span>
      </div>
    </ModalOverlay>
  );
};

export default UnassignedMsg;
