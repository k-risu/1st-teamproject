import axios from "axios";
import {
  Container,
  ContainerTitle,
  Duration,
  ProjectDataSubtitle,
  ProjectDataWrap,
  ProjectListWrap,
  Projects,
  Subtitle,
} from "./ProjectList.styles";
import { FaCircle, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../../utils/isLogin";

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  useEffect(() => {
    const getProjectList = async () => {
      try {
        const res = await axios.get(`/api/project`, {
          params: {
            signedUserNo: cookies.signedUserNo,
          },
        });
        console.log(res);

        setProjectList(res.data.projectList);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectList();
  }, []);

  const goProjectNo = (e) => {
    console.log(e);

    navigate(`/project/dashboard`, {
      state: {
        projectNo: e,
      },
    });
  };

  return (
    <Container>
      <ContainerTitle>내가 진행중인 프로젝트</ContainerTitle>
      {projectList.map((item) => (
        <ProjectListWrap
          key={item.projectNo}
          onClick={() => goProjectNo(item.projectNo)}
        >
          <ProjectDataWrap>
            <Projects>
              <ProjectDataSubtitle>프로젝트명</ProjectDataSubtitle>
              <div>
                <FaCircle style={{ color: "yellowgreen", marginRight: 3 }} />
                <p>{item.title}</p>
              </div>
              <div>
                {/* <FaRegUser style={{ color: "darkgray", marginRight: 3 }} /> */}
                {/* <div>7명</div> */}
              </div>
            </Projects>
            <Projects>
              <ProjectDataSubtitle>프로젝트 기간</ProjectDataSubtitle>
              <Duration>
                {item.startAt} ~ {item.deadline}
              </Duration>
            </Projects>
            <Projects>
              <ProjectDataSubtitle>프로젝트 내용</ProjectDataSubtitle>
              <Subtitle>{item.description}</Subtitle>
            </Projects>
          </ProjectDataWrap>
        </ProjectListWrap>
      ))}
    </Container>
  );
};
export default ProjectList;
