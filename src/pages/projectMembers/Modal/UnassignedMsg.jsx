import { useEffect } from "react";
import { AlertIcon, ModalOverlay } from "./UnassignedMsg.styles";

/**
 * 담당자가 부여되지 않은 목표에 대한 알림 모달 컴포넌트
 * @param {boolean} isOpen - 모달이 열려있는지 여부
 * @param {function} closeModal - 모달을 닫는 함수
 * @returns {JSX.Element|null} 모달 UI 또는 null
 */
const UnassignedMsg = ({ isOpen, closeModal }) => {
  useEffect(() => {
    /**
     * 모달이 열리면 3초 후에 자동으로 닫히도록 타이머 설정
     * 컴포넌트가 언마운트되거나 isOpen이 false로 바뀌면 타이머를 정리합니다.
     */
    if (isOpen) {
      const timer = setTimeout(() => {
        closeModal(); // 3초 뒤에 모달 닫기
      }, 3000);

      // 컴포넌트가 언마운트되거나 isOpen이 false로 바뀌면 타이머를 정리합니다.
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]); // isOpen이나 closeModal이 변경될 때마다 실행됩니다.

  // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
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
