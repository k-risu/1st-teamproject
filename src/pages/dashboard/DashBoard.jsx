import {
  CompletionContainer,
  ContainerTitle,
  ContainerWrap,
  DashBoardContainer,
  MemberContainer,
  ProjectData,
  ProjectInfo,
} from "./DashBoard.styles";
import { ResponsiveBullet } from "@nivo/bullet";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DashBoard = () => {
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
      <div>팀 프로젝트의 대시보드</div>
      <ContainerWrap style={{ marginTop: 30 }}>
        <CompletionContainer>
          <ContainerTitle>달성률(D-18)</ContainerTitle>
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
              <SwiperSlide>
                <img src="public\profile1.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="public\profile2.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="public\profile3.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="public\profile4.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="public\profile5.png" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="public\profile6.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="public\profile7.png" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </MemberContainer>
      </ContainerWrap>
      <ContainerWrap>
        <ProjectInfo>
          <ContainerTitle>프로젝트 세부내용</ContainerTitle>
          <div>세부내용</div>
        </ProjectInfo>
        <ProjectData>
          <ContainerTitle>프로젝트 자료</ContainerTitle>
          <div>자료 게시판</div>
        </ProjectData>
      </ContainerWrap>
    </DashBoardContainer>
  );
};
export default DashBoard;
