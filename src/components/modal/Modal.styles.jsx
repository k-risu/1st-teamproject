import styled from "@emotion/styled";

export const ModalBackGround = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;
`;

export const ModalBox = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 1);
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ButtonModal = styled.div`
  width: 70px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: aliceblue;
`;
