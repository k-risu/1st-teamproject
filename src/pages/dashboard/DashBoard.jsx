import { ResponsiveBullet } from "@nivo/bullet";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
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

const DashBoard = () => {
  const [projectData, setProjectData] = useState({});
  const [memberList, setMemberList] = useState([]);

  const projectNo = 2;
  const signedUserNo = 1;

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `api/project/${projectNo}?signedUserNo=${signedUserNo}`,
        );
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
  const endDate = dayjs("2025-01-08");
  // const endDate = dayjs(project.deadLine); 백엔드 데이터 연동시
  // 두 날짜 사이의 날짜 차이를 계산
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

  return (
    <DashBoardContainer>
      <DashBoardTitleWrap>
        <span>팀 프로젝트의 대시보드</span>
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
            <Swiper slidesPerView={5} spaceBetween={10}>
              {memberList.map((item) => (
                <SwiperSlide key={item.userNo}>
                  <SlideImage
                    src={`${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`}
                    alt="유저 프로필"
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "50%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ display: "flex" }}>
            <span>다른사람에게 팀장을 맡기고 싶다면?</span>
            <div>팀장 권한 위임</div>
          </div>
          <div style={{ display: "flex" }}>
            <span>이미 모든 할 일이 끝났다면?</span>
            <div>프로젝트 완료하기</div>
          </div>
          <div style={{ display: "flex" }}>
            <span>프로젝트를 삭제하시겠습니까?</span>
            <div>프로젝트 삭제</div>
          </div>
        </div>
      </ContainerWrap>
    </DashBoardContainer>
  );
};
export default DashBoard;
