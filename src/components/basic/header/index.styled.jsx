import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1600px;
  height: 50vh;
  margin: 0 auto;
  overflow: hidden;
  display: flex;

  background-color: grey;
`;

export const SideBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 150px;
  height: 50vh;
  align-items: center;
  position: absolute;
  border-right: 1px solid black;
  gap: 30px;

  background-color: blue;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin-left: 150px;
  border-bottom: 1px solid black;

  background-color: aliceblue;
`;
