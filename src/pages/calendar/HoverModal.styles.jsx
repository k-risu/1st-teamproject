import styled from "@emotion/styled";

export const ModalLayout = styled.div`
  width: 200px;
  height: 100px;
  background-color: whitesmoke;
  position: fixed;
  border: 1px solid black;
  border-radius: 3px;
  left: ${(props) => `${props.modalXY.x}px`};
  top: ${(props) => `${props.modalXY.y}px`};

  z-index: 99;
`;
