import {
  Container,
  ContainerTitle,
  ProjectDataSubtitle,
  ProjectListWrap,
  Projects,
} from "./ProjectList.styles";
import { FaCircle, FaRegUser } from "react-icons/fa";

const ProjectList = () => {
  return (
    <Container>
      <ContainerTitle>내가 진행중인 프로젝트</ContainerTitle>
      <ProjectListWrap>
        <Projects>
          <ProjectDataSubtitle>프로젝트명</ProjectDataSubtitle>
          <div>
            <FaCircle style={{ color: "yellowgreen", marginRight: 3 }} />
            <p>팀 프로젝트</p>
          </div>
          <div>
            <FaRegUser style={{ color: "darkgray", marginRight: 3 }} />
            <div>7명</div>
          </div>
        </Projects>
        <Projects>
          <ProjectDataSubtitle>프로젝트 기간</ProjectDataSubtitle>
          <div>2024-12-16 ~ 2025-01-08</div>
        </Projects>
        <Projects>
          <ProjectDataSubtitle>프로젝트 내용</ProjectDataSubtitle>
          <div>프로젝트 설명글에 해당하는 내용입니다</div>
        </Projects>
      </ProjectListWrap>
    </Container>
  );
};
export default ProjectList;
