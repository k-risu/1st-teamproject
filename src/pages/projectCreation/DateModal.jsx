import { useForm } from "react-hook-form";
import {
  ButtonWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
} from "./DateModal.styles";

export const DateModal = ({ isOpen, closeModal, setEventData }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const dateSubmitHandler = (data) => {
    if (data.startAt && data.deadLine) {
      console.log(data);

      closeModal();
      return setEventData({
        ...data,
        startAt: data.startAt,
        deadLine: data.deadLine,
      });
    } else if (data.startAt === "") {
      console.log("시작일을 선택해주세요");
    } else if (data.deadLine === "") {
      console.log("종료일을 선택해주세요");
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>현재선택한 날짜를 확인해주세요</h2>
        <label>
          시작 일자
          <ModalInput type="date" {...register("startAt")} />
        </label>
        <label>
          종료 일자
          <ModalInput type="date" {...register("deadLine")} />
        </label>
        <ButtonWrapper>
          <button type="button" onClick={handleSubmit(dateSubmitHandler)}>
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
