import styled from "@emotion/styled";

export const Container = styled.div`
  /* flex-direction: column; */
  max-width: 1400px;
  width: 100%;
  height: 100%;
  padding: 50px 60px;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: flex-start;
  justify-content: space-between;
`;

export const ContainerTitle = styled.p`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 50px;
  justify-content: flex-start;
`;

export const ProjectListWrap = styled.ul`
  display: flex;
  margin-bottom: 20px;
  width: 400px;
`;

export const ProjectDataWrap = styled.div`
  text-wrap: nowrap;
  background-color: white;
  border: 1px solid black;
  border-radius: 6px;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
`;

export const Projects = styled.li`
  display: flex;
  width: 300px;
  max-height: 500px;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 5px;
  }
`;

export const ProjectDataSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
