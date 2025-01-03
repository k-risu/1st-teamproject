import axios from "axios";
import {
  Container,
  ContainerTitle,
  ProjectDataSubtitle,
  ProjectListWrap,
  Projects,
} from "./ProjectList.styles";
import { FaCircle, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const getProjectList = async () => {
      try {
        const res = await axios.get(`api/project?signedUserNo=62&page=0`);
        console.log(res);
        console.log(res.data.projectList);
        setProjectList(res.data.projectList);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectList();
  }, []);

  return (
    <Container>
      <ContainerTitle>내가 진행중인 프로젝트</ContainerTitle>

      {projectList.map((item) => (
        <ProjectListWrap key={item.projectNo}>
          <Projects>
            <ProjectDataSubtitle>프로젝트명</ProjectDataSubtitle>
            <div>
              <FaCircle style={{ color: "yellowgreen", marginRight: 3 }} />
              <p>{item.title}</p>
            </div>
            <div>
              <FaRegUser style={{ color: "darkgray", marginRight: 3 }} />
              <div>7명</div>
            </div>
          </Projects>
          <Projects>
            <ProjectDataSubtitle>프로젝트 기간</ProjectDataSubtitle>
            <div>
              {item.startAt} ~ {item.deadline}
            </div>
          </Projects>
          <Projects>
            <ProjectDataSubtitle>프로젝트 내용</ProjectDataSubtitle>
            <div>{item.description}</div>
          </Projects>
        </ProjectListWrap>
      ))}
    </Container>
  );
};
export default ProjectList;
