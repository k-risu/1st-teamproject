import styled from "@emotion/styled";
import { GoAlert } from "react-icons/go";

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
  background: white;
  width: 300px;
  height: 200px;
  padding: 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  text-align: left;

  h2 {
    text-align: center;
    display: inline-block;
    width: 250px;
    font-size: 16px;
    margin-bottom: 15px;
    color: #ff1e00;
  }
  div {
    display: flex;
    gap: 30px;
    & > button {
      background-color: #dfdfdf !important;
      color: #000 !important;
      padding: 5px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 15px;
      margin-top: 30px;
    }
  }
`;
export const AlertIcon = styled(GoAlert)`
  font-size: 45px;
  color: #ff1e00;
`;
