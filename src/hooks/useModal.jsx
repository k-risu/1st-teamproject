import { useCallback, useState } from "react";
import Modal from "../components/modal/Modal";

const useModal = ({ useBlur = true } = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(() => true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(() => false);
  }, []);

  return {
    Modal: isOpen
      ? ({ children }) => (
          <Modal onClose={useBlur ? close : null}>{children}</Modal>
        )
      : () => null,
    open,
    close,
    isOpen,
  };
};
export default useModal;
