import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  max-width: 1600px;
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100vh;

  /* background-color: pink; */
`;

export const Main = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  width: 90%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
