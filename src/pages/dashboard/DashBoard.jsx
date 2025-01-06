import { ResponsiveBullet } from "@nivo/bullet";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  ButtonDescription,
  ButtonSection,
  ButtonTitle,
  ButtonTitleDanger,
  ButtonWrap,
  CompletionContainer,
  ContainerTitle,
  ContainerWrap,
  DashBoardContainer,
  DashBoardTitleWrap,
  DashBoardToggleWrap,
  MemberContainer,
  ProjectData,
  ProjectInfo,
  SlideImage,
  DescriptionSection,
} from "./DashBoard.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isLogin } from "../../utils/isLogin";
import {
  MembersSection,
  MembersSectionBT,
} from "../projectMembers/ProjectMembers.styles";
import ToggleButton from "../../components/ToggleButton";
import ProjectProgress from "./ProjectProgress";

const DashBoard = () => {
  const location = useLocation();
  const [clickProjectNo, setclickProjectNo] = useState(
    location.state?.projectNo,
  );

  const [projectData, setProjectData] = useState({});
  const [memberList, setMemberList] = useState([]);

  const [activeButton, setActiveButton] = useState("left");

  const navigate = useNavigate();
  const [cookies] = useCookies(["signedUserNo"]);

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`/api/project/${clickProjectNo}`, {
          params: {
            signedUserNo: cookies.signedUserNo,
          },
        });
        console.log(res);
        setProjectData(res.data.project);
        setMemberList(res.data.project.memberList);
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, []);

  const today = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs(projectData.deadLine);
  const d_Day = endDate.diff(today, "day");
  console.log(d_Day);

  const data = [
    {
      id: 1,
      title: "전체 달성률",
      ranges: [10, 40, 53, 0, 100],
      measures: [84],
      markers: [74],
    },
    {
      id: 2,
      title: "개인 달성률",
      ranges: [14, 19, 31, 25, 34, 42, 0, 80],
      measures: [28],
      markers: [74],
    },
  ];

  const projectCompleteHandler = async () => {
    try {
      const res = await axios.post(
        `/api/project/${projectData.projectNo}`,
        {},
        {
          params: {
            signedUserNo: cookies.signedUserNo,
          },
        },
      );
      console.log(res);
      alert(`${projectData.title}를 완료하셨습니다!`);
      navigate(`/project`);
    } catch (error) {
      console.log(error);
    }
  };

  const projectDeleteHandler = async () => {
    const deleteData = {
      ...projectData,
      projectNo: projectData.projectNo,
      signedUserNo: cookies.signedUserNo,
    };
    console.log(deleteData);

    try {
      const res = await axios.delete(`/api/project`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        data: deleteData,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(-1);
    }
  };
  const goProjectEdit = async (e) => {
    console.log(e);

    console.log("프로젝트 정보를 수정합니다");
    navigate(`/project/edit`, {
      state: {
        projectNo: e.projectNo,
        title: e.title,
        description: e.description,
        startAt: e.startAt,
        deadLine: e.deadLine,
        memberList: e.memberList,
      },
    });
  };

  const goProjectMembers = (e) => {
    console.log(e);
    setActiveButton("right");

    navigate(`/project/members`, {
      state: {
        projectNo: e,
      },
    });
  };
  const goUserPage = (e) => {
    console.log("여기111", e);

    navigate(`/mypage`, {
      state: {
        targetUserNo: e,
      },
    });
  };

  const [teamProgress, setTeamProgress] = useState(60);
  const [personalProgress, setPersonalProgress] = useState(40);

  const increaseTeamProgress = () => {
    setTeamProgress((prev) => Math.min(prev + 5, 100));
  };

  const increasePersonalProgress = () => {
    setPersonalProgress((prev) => Math.min(prev + 10, 100));
  };

  return (
    <DashBoardContainer>
      <DashBoardTitleWrap>
        <span>{projectData.title}의 대시보드</span>
        <ToggleButton
          leftLabel="대시보드"
          rightLabel="구성원"
          activeButton={activeButton}
          onRightClick={() => goProjectMembers(clickProjectNo)}
        />
      </DashBoardTitleWrap>
      <ContainerWrap style={{ marginTop: 30 }}>
        <CompletionContainer>
          <ContainerTitle>
            달성률 (D-<span style={{ color: "red" }}>{d_Day}</span>)
          </ContainerTitle>
          <ProjectProgress
            teamProgress={teamProgress}
            personalProgress={personalProgress}
          />
        </CompletionContainer>
        <MemberContainer>
          <ContainerTitle>프로젝트 구성원</ContainerTitle>
          <div>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              style={{ cursor: "pointer" }}
            >
              {memberList.map((item) => (
                <SwiperSlide key={item.userNo}>
                  {item.pic === null ? (
                    <SlideImage
                      src="/default_profile.jpg"
                      alt="유저 프로필"
                      onClick={() => goUserPage(item.userNo)}
                    />
                  ) : (
                    <SlideImage
                      src={`${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`}
                      alt="유저 프로필"
                      onClick={() => goUserPage(item.userNo)}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </MemberContainer>
      </ContainerWrap>
      <ContainerWrap>
        <ProjectInfo>
          <ContainerTitle>프로젝트 세부내용</ContainerTitle>
          <DescriptionSection>{projectData.description}</DescriptionSection>
        </ProjectInfo>
        <ProjectData>
          <ButtonSection>
            <ButtonWrap>
              <ButtonDescription style={{ textDecorationLine: "underline" }}>
                프로젝트 정보를 수정하고 싶다면?
              </ButtonDescription>
              <ButtonTitle onClick={() => goProjectEdit(projectData)}>
                프로젝트 수정하기
              </ButtonTitle>
            </ButtonWrap>
            <ButtonWrap>
              <ButtonDescription style={{ textDecorationLine: "underline" }}>
                이미 모든 할 일이 끝났다면?
              </ButtonDescription>
              <ButtonTitle onClick={() => projectCompleteHandler()}>
                프로젝트 완료하기
              </ButtonTitle>
            </ButtonWrap>
            <ButtonWrap>
              <ButtonDescription style={{ color: "#ff3c3c" }}>
                프로젝트를 삭제하시겠습니까?
              </ButtonDescription>
              <ButtonTitleDanger onClick={() => projectDeleteHandler()}>
                프로젝트 삭제
              </ButtonTitleDanger>
            </ButtonWrap>
          </ButtonSection>
        </ProjectData>
      </ContainerWrap>
    </DashBoardContainer>
  );
};
export default DashBoard;
