import styled from "@emotion/styled";

export const SideBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 10%;
  height: 100vh;
  align-items: center;
  position: absolute;
  border-right: 1px solid black;
  gap: 30px;

  background-color: whitesmoke;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 90%;
  border-bottom: 1px solid black;

  background-color: white;
`;
