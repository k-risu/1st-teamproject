import styled from "@emotion/styled";
import { FaCalendarDay } from "react-icons/fa";

const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  gap: 10px;

  h2 {
    font-size: 15px;
    align-self: flex-start;
    font-weight: 500px;
  }

  label {
    /* margin-right: 15px; */
    margin-top: 40px;
    font-size: 18px;
    margin-bottom: 0px;
  }

  div > button {
    background-color: #dfdfdf;
    color: #000;
    padding: 5px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    font-size: 15px;
  }

  button:hover {
    background-color: #b4b4b4;
  }
`;
export const ButtonWrapper = styled.div`
  ${alignment}
  gap: 5vw;
  /* justify-content: space-between; */
  /* width: 100%; */
  margin-top: 40px;
`;
export const ModalInput = styled.input`
  margin-left: 25px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;

  padding: 4.5px;
  font-size: 18px;
  width: 200px;
  border-radius: 5px;
  /* border: 2px solid #7a7a7a !important; */
  border: 2px solid #f4f4f4 !important;
  background-color: #f4f4f4;
  &:focus {
    outline: none;
    border: 2px solid #f4f4f4;
  }
`;
export const CalendarIcon = styled(FaCalendarDay)`
  position: absolute;
  top: ${(props) => (props.dateRange ? "95px" : "180px")};
  /* top: ${(props) => (props.dateRange ? "10.3vh" : "19.3vh")}; */
  right: 95px;
  /* right: 5vw; */
  font-size: 20px;
`;
