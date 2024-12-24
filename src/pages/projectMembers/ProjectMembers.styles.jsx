import styled from "@emotion/styled";
import { SlOptionsVertical } from "react-icons/sl";

// 상수들
const topColor = "#fcc0b2";
const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MembersLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: auto; */
  background-color: #fbfbfb;
  width: 100vw;
  height: 100vh;
`;

export const ProjectTitle = styled.h1`
  position: relative;
  font-size: 25px;
  text-align: left;
  width: 100%;
  margin-left: 50px;
  span {
    color: #10be00;
  }
  div {
    position: absolute;
    font-size: 13px;
    top: -10px;
    left: 0;
  }
`;

export const MembersLayoutTop = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  justify-content: space-between;
`;
export const MembersSection = styled.div`
  width: 160px;
  display: flex;
  margin-right: 70px;
`;

export const MembersSectionBT = styled.button`
  width: 80px;
  height: 30px;

  ${(props) =>
    props.sideProps ? "" : "box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3)"};
  border-radius: ${(props) =>
    props.sideProps ? "5px 0 0 5px" : "0 5px 5px 0"};
  border: 2px solid #7f7f7f;

  border-right: ${(props) => (props.sideProps ? "none" : "2px solid #7f7f7f")};
  /* 왼쪽 버튼 (대시보드)의 오른쪽 테두리 제거 */
  border-left: ${(props) => (props.sideProps ? "2px solid #7f7f7f" : "none")};
  ${(props) => (props.sideProps ? "" : "border: 2px solid #4c4c4c")}
  ${(props) => (props.sideProps ? "color:#8f8f8f" : "")}
`;

// 카드 스타일
export const Card = styled.div`
  height: 350px;
  width: 275px;
  background-color: #f5f5f5;
  border-radius: 12px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7); // 카드에 그림자 추가
  overflow: hidden;
`;

// 카드 상단 색상
export const CardTod = styled.div`
  height: 20px;
  background-color: ${topColor};
  border-radius: 7px 7px 0 0;
`;

// 팀원 이미지 스타일
export const CardImg = styled.img`
  margin-top: 10px;
  margin-left: 10px;
  height: 47px;
  width: 47px;
  border-radius: 24px;
  background-color: ${(props) =>
    props.noImage ? "#c0c0c0" : "transparent"}; /* 이미지가 없으면 회색 배경 */
  background-image: ${(props) =>
    props.noImage
      ? "none"
      : `url(${props.src})`}; /* 이미지가 없으면 배경 이미지를 안 넣음 */
`;

// 옵션 아이콘
export const MoreOptionsIcon = styled(SlOptionsVertical)`
  position: absolute;
  font-size: 13px;
  right: 10px;
  top: 10px;
  color: #c0c0c0;
  cursor: pointer;
`;

// 팀원 정보 스타일
export const MemberInfo = styled.div`
  display: flex;
  position: relative;
  padding-top: 10px;
`;

// 팀원 정보 텍스트 스타일
export const MemberInfoWrap = styled.div`
  ${alignment};
  margin-left: 51px;
  flex-direction: column;
  h2 {
    font-size: 15px;
    font-weight: 600;
  }
  span {
    font-size: 12px;
    color: #c0c0c0;
  }
`;

// 할 일 목록 텍스트 스타일
export const TaskList = styled.textarea`
  display: flex;
  margin: 0 auto;
  margin-top: 15px;
  font-size: 14px;
  width: 250px;
  border-radius: 5px;
  border: 2px solid #dedede;
  background-color: #dedede;

  pointer-events: none;

  &:focus {
    outline: none;
    border: 2px solid #67da6f;
  }
  height: 200px;
  resize: none;
`;

// 진행 상황을 나타내는 바 스타일
export const ProgressBar = styled.div`
  width: 250px;
  height: 15px;
  background-color: #67da6f;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 8px;
`;

// 위 4개의 카드를 한 줄에 4개 배치 (Flexbox)
export const TopMembers = styled.div`
  display: flex;
  flex-wrap: nowrap; /* 카드들이 여러 줄로 나눠지도록 설정 */
  /* justify-content: space-between; */
  gap: 20px;
  margin-bottom: 30px;
  margin-top: ${(props) => (props.top ? "20px" : "50px")};
  /* margin-top: 50px; */
`;

// 하단 4개의 카드를 한 줄에 4개 배치 (Flexbox)
export const BottomMembers = styled.div`
  display: flex;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  gap: 20px;
`;
