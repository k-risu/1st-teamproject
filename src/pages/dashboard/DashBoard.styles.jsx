import styled from "@emotion/styled";

export const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 1250px;
`;

export const DashBoardTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;

  > span {
    font-size: 24px;
    font-weight: 700;
  }
`;

export const DashBoardToggleWrap = styled.div`
  button {
    width: 85px;
    height: 35px;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 500;
  }
`;

export const ContainerWrap = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  margin-bottom: 20px;
`;

export const ContainerTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const CompletionContainer = styled.div`
  width: 50%;
  height: 50%;
`;

export const MemberContainer = styled.div`
  width: 50%;
  height: 50%;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin: 10px;
    border: 1px solid rgb(120, 120, 120, 0.3);
  }
`;

export const ProjectInfo = styled.div`
  width: 50%;
  height: 50%;

  div {
    max-width: 500px;
    height: 350px;
    background-color: white;
    box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
    /* box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25); */
  }
`;

export const ProjectData = styled.div`
  width: 50%;
  height: 50%;

  div {
    max-width: 500px;
    height: 350px;
    background-color: white;
    box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
    /* box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25); */
  }
`;

export const SlideImage = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
`;
