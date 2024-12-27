import styled from "@emotion/styled";
import { GoAlert } from "react-icons/go";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
  div {
    width: 450px;
    height: 300px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  span {
    /* background-color: #fff; */
    margin-top: 30px;
    color: #ff0000;
  }
`;
export const MoreOptionsIcon = styled(GoAlert)`
  font-size: 55px;
  color: #ff1e00;
`;
