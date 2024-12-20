// import { useState } from "react";

import {
  ButtonWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
  ModalText,
  DetailMember,
} from "./AddModal.styles";

export const AddModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  //   const { add, setAdd } = useState({});

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalInput placeholder="닉네임 또는 이메일로 검색해보세요" />
        <DetailMember />
        <h2>구성원</h2>
        <div>
          <ModalText />
        </div>
        <ButtonWrapper>
          <button type="button">추가</button>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
