import { ModalBackGround } from "./Modal.styles";

const Modal = ({ onClose, Children }) => {
  return <ModalBackGround onClick={onClose}>{Children}</ModalBackGround>;
};
export default Modal;
