import { useCallback } from "react";
import {
  ModalOverlay,
  ModalContent,
  OptionButton,
  Separator,
} from "./MoreOptionsModal.styles";

const MoreOptionsModal = ({
  isOpenModal,
  closeModal,
  modalPosition,
  signedUserNo,
  memberRole,
  role,
  openTaskModalFor,
  onOpenDeleteModal,
  setSelectedInfo,
  selectedInfo,
}) => {
  if (!isOpenModal) return null;

  /**
   * 새 할일을 등록하는 함수.
   * 모달을 닫고, 선택된 정보를 업데이트한 후, 할 일 등록 모달을 엽니다.
   * @returns {void}
   */
  const handleNewTask = useCallback(() => {
    closeModal(); // closeModal 함수 호출
    setSelectedInfo((prevState) => ({
      ...prevState,
      modalMode: "add",
    }));
    openTaskModalFor(); // openTaskModalFor 함수 호출
  }, [closeModal, setSelectedInfo, openTaskModalFor]);

  /**
   * 할 일을 삭제하는 함수.
   * 삭제 모달을 여는 함수 호출을 합니다.
   * @returns {void}
   */
  const handleDelete = useCallback(() => {
    onOpenDeleteModal(); // 함수 호출
  }, [onOpenDeleteModal]);

  /**
   * 사용자 역할에 따라 모달 옵션을 렌더링하는 함수.
   * - 내가 리더이고 나를 선택한 경우: "새 할일 등록" 옵션만 렌더링
   * - 내가 리더이고 나를 선택하지 않은 경우: "새 할일 등록"과 "제외하기" 옵션 렌더링
   * - 내가 팀원일 경우: "새 할일 등록"과 "나가기" 옵션 렌더링
   * @returns {JSX.Element|null} 선택된 역할에 맞는 모달 옵션을 반환합니다.
   */
  const roleCheck = () => {
    // 내가 리더이고 나를 선택한게 아닐때
    if (signedUserNo === role && signedUserNo !== memberRole) {
      return (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <OptionButton onClick={handleNewTask}>새 할일 등록</OptionButton>
          <Separator />
          <OptionButton onClick={handleDelete}>제외하기</OptionButton>
        </ModalContent>
      );
    }
    // 내가 리더이고 나를 선택할때
    if (signedUserNo === role && signedUserNo === memberRole) {
      return (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <OptionButton onClick={handleNewTask}>새 할일 등록</OptionButton>
        </ModalContent>
      );
    }
    // 내가 팀원일때
    if (signedUserNo !== role) {
      return (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <OptionButton onClick={handleNewTask}>새 할일 등록</OptionButton>
          <Separator />
          <OptionButton onClick={handleDelete}>나가기</OptionButton>
        </ModalContent>
      );
    }
    return null;
  };

  return <ModalOverlay onClick={closeModal}>{roleCheck()}</ModalOverlay>;
};

export default MoreOptionsModal;
