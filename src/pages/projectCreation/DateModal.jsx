// import { useState } from "react";

import {
  ButtonWrapper,
  CalendarIcon,
  ModalContent,
  ModalInput,
  ModalOverlay,
} from "./DateModal.styles";

export const DateModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  //   const { add, setAdd } = useState({});

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>현재선택한 날짜를 확인해주세요</h2>
        <CalendarIcon dateRange={true} />
        <label>
          시작일
          <ModalInput />
        </label>
        <CalendarIcon dateRange={false} />
        <label>
          종료일
          <ModalInput />
        </label>
        <ButtonWrapper>
          <button type="button" onClick={closeModal}>
            확인
          </button>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
