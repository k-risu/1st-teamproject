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
} from "./DashBoard.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [projectData, setProjectData] = useState({});
  const [memberList, setMemberList] = useState([]);

  const navigate = useNavigate();

  const projectNo = 34;
  const signedUserNo = 62;

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `api/project/${projectNo}?signedUserNo=${signedUserNo}`,
        );
        console.log(res.data.project);
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
    const completeData = { ...projectData.projectNo };
    console.log(completeData);

    try {
      const res = await axios.post(
        `api/project/${projectData.projectNo}?signedUserNo=62`,
      );
      console.log(res);
      alert(`${projectData.title}를 완료하셨습니다!`);
    } catch (error) {
      console.log(error);
    }
  };

  const projectDeleteHandler = async () => {
    const deleteData = { ...projectData, projectNo, signedUserNo };
    console.log(deleteData);

    try {
      const res = await axios.delete(`api/project`, {
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

  const projectEditHandler = async () => {
    const editData = { ...projectData };

    try {
      // const res = await axios.put(`api/project`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "*/*",
      //   },
      //   data: editData,
      // });
      console.log("프로젝트 정보를 수정합니다");
      navigate(`/project/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashBoardContainer>
      <DashBoardTitleWrap>
        <span>{projectData.title}의 대시보드</span>
        <DashBoardToggleWrap>
          <button>대시보드</button>
          <button>구성원</button>
        </DashBoardToggleWrap>
      </DashBoardTitleWrap>
      <ContainerWrap style={{ marginTop: 30 }}>
        <CompletionContainer>
          <ContainerTitle>
            달성률 (D-<span style={{ color: "red" }}>{d_Day}</span>)
          </ContainerTitle>
          <div>
            <div>
              <p>{data[0].title}</p>
              <ResponsiveBullet
                data={[data[0]]}
                margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
                spacing={30}
                titleAlign="start"
                titleOffsetX={-70}
                measureSize={1}
                markerSize={0}
                motionConfig="slow"
              ></ResponsiveBullet>
            </div>
            <div>
              <p>{data[1].title}</p>
              <ResponsiveBullet
                data={[data[1]]}
                margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
                spacing={30}
                titleAlign="start"
                titleOffsetX={-70}
                measureSize={1}
                markerSize={0}
                motionConfig="slow"
              />
            </div>
          </div>
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
                  <SlideImage
                    src={
                      item.pic === null
                        ? `public/profile8.jpg`
                        : `${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`
                    }
                    alt="유저 프로필"
                    onClick={() => navigate(`mypage`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </MemberContainer>
      </ContainerWrap>
      <ContainerWrap>
        <ProjectInfo>
          <ContainerTitle>프로젝트 세부내용</ContainerTitle>
          <div>{projectData.description}</div>
        </ProjectInfo>
        {/* <ProjectData>
          <ContainerTitle>프로젝트 자료</ContainerTitle>
          <div>
            <p>게시판</p>
          </div>
        </ProjectData> */}
        <ProjectData>
          <ButtonSection>
            <ButtonWrap>
              <ButtonDescription style={{ textDecorationLine: "underline" }}>
                프로젝트 정보를 수정하고 싶다면?
              </ButtonDescription>
              <ButtonTitle onClick={() => projectEditHandler()}>
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
