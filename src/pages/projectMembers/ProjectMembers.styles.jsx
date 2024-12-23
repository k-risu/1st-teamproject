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
`;

// 카드 스타일
export const Card = styled.div`
  height: 350px;
  width: 275px;
  background-color: #f5f5f5;
  border-radius: 12px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 카드에 그림자 추가
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
  background-color: blue; // 이미지를 로드할 수 없을 때 fallback 색상
`;

// 옵션 아이콘
export const MoreOptionsIcon = styled(SlOptionsVertical)`
  position: absolute;
  font-size: 13px;
  right: 10px;
  top: 10px;
  color: #c0c0c0;
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
  &:focus {
    outline: none;
    border: 2px solid #67da6f;
  }
  height: 100px;
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
  flex-wrap: wrap; /* 카드들이 여러 줄로 나눠지도록 설정 */
  /* justify-content: space-between; */
  gap: 20px;
  margin-bottom: 30px;
  margin-top: 50px;
`;

// 하단 4개의 카드를 한 줄에 4개 배치 (Flexbox)
export const BottomMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 20px;
`;
