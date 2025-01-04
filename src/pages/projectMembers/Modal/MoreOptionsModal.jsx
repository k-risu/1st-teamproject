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
          <OptionButton
            onClick={() => {
              closeModal(); // closeModal 함수 호출
              setSelectedInfo((prevState) => ({
                ...prevState,
                modalMode: "add",
              }));
              openTaskModalFor(); // openTaskModalFor 함수 호출
            }}
          >
            새 할일 등록
          </OptionButton>
          <Separator />
          <OptionButton
            onClick={() => {
              onOpenDeleteModal(); // 함수 호출
            }}
          >
            제외하기
          </OptionButton>
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
          <OptionButton
            onClick={() => {
              closeModal(); // closeModal 함수 호출
              setSelectedInfo((prevState) => ({
                ...prevState,
                modalMode: "add",
              }));
              openTaskModalFor(); // openTaskModalFor 함수 호출
            }}
          >
            새 할일 등록
          </OptionButton>
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
          <OptionButton
            onClick={() => {
              closeModal(); // closeModal 함수 호출
              setSelectedInfo((prevState) => ({
                ...prevState,
                modalMode: "add",
              }));
              openTaskModalFor(); // openTaskModalFor 함수 호출
            }}
          >
            새 할일 등록
          </OptionButton>
          <Separator />
          <OptionButton
            onClick={() => {
              onOpenDeleteModal(); // 함수 호출
            }}
          >
            나가기
          </OptionButton>
        </ModalContent>
      );
    }
    return null;
  };

  return <ModalOverlay onClick={closeModal}>{roleCheck()}</ModalOverlay>;
};
export default MoreOptionsModal;
