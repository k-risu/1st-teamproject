import styled from "@emotion/styled";

export const ModalBackGround = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;

  z-index: 9;
`;
