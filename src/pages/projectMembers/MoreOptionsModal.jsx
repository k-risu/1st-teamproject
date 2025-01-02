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
  onAddNewTask,
  projectNo, // projectNo 추가
  isLeader, // 리더 여부
}) => {
  if (!isOpenModal) return null;
  const roleCheck = () => {
    if (signedUserNo === role && signedUserNo !== memberRole) {
      return (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <OptionButton onClick={onAddNewTask}>새 할일 등록</OptionButton>
          <Separator />
          <OptionButton onClick={() => console.log("제외하기 클릭!")}>
            제외하기
          </OptionButton>
        </ModalContent>
      );
    }
    if (signedUserNo === role && signedUserNo === memberRole) {
      return (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <OptionButton onClick={onAddNewTask}>새 할일 등록</OptionButton>
        </ModalContent>
      );
    }
    if (signedUserNo !== role && signedUserNo === memberRole) {
      return (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <OptionButton onClick={onAddNewTask}>새 할일 등록</OptionButton>
          <Separator />
          <OptionButton onClick={closeModal}>나가기</OptionButton>
        </ModalContent>
      );
    }
    return null;
  };

  return <ModalOverlay onClick={closeModal}>{roleCheck()}</ModalOverlay>;
};
export default MoreOptionsModal;
