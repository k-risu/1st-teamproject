import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 1200px;
  max-height: 700px;
`;

export const ContainerTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const ProjectListWrap = styled.ul`
  width: 100%;
  height: 100%;
`;

export const Projects = styled.li`
  display: flex;
  width: 40%;
  max-height: 300px;
  justify-content: flex-start;
  align-items: center;

  div {
    display: flex;
    margin-right: 20px;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const ProjectDataSubtitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;
