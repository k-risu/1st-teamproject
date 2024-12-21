import {
  ButtonModal,
  ButtonWrap,
  ModalBackGround,
  ModalBox,
} from "./Modal.styles";

const Modal = ({ onClose, isOpen }) => {
  return (
    <ModalBackGround onClick={onClose}>
      <ModalBox>
        <div>현재 선택하신 날짜를 확인해주세요</div>
        <br />
        <div>
          <label>시작일</label>
          <input type="date" />
          &nbsp; ~ &nbsp;
          <label>종료일</label>
          <input type="date" />
        </div>
        <br />
        <ButtonWrap>
          <ButtonModal onClick={() => isOpen(false)}>확인</ButtonModal>
          <ButtonModal onClick={() => isOpen(false)}>취소</ButtonModal>
        </ButtonWrap>
      </ModalBox>
    </ModalBackGround>
  );
};
export default Modal;
