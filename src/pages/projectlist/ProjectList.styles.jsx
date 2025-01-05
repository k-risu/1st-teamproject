import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 1200px;
  max-height: 700px;
  height: 700px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ContainerTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 50px;
  justify-content: flex-start;
`;

export const ProjectListWrap = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Projects = styled.li`
  display: flex;
  width: 400px;
  max-height: 500px;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ProjectDataSubtitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;
