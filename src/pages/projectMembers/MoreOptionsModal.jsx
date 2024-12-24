import {
  ModalOverlay,
  ModalContent,
  OptionButton,
  Separator,
} from "./MoreOptionsModal.styles"; // 스타일 임포트

const MoreOptionsModal = ({ isOpenModal, closeModal, modalPosition }) => {
  if (!isOpenModal) return null; // 모달이 열려야만 렌더링

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent
        onClick={(e) => e.stopPropagation()} // 클릭 시 외부로 전파되지 않게
        style={{
          top: `${modalPosition.top}px`, // 동적 위치 설정
          left: `${modalPosition.left}px`, // 아이콘의 오른쪽에 배치
        }}
      >
        <OptionButton onClick={() => console.log("새 할일 등록 클릭!")}>
          새 할일 등록
        </OptionButton>
        <Separator />
        <OptionButton onClick={closeModal}>나가기</OptionButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MoreOptionsModal;
