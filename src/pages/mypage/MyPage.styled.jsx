import styled from "@emotion/styled";

export const UserId = styled.div`
  font-size: 16px;
  color: #333;
`;

// 헤더 영역 스타일
export const Header = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  padding: 20px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  max-width: 700px;
  /* background-color: white; */
  margin: 0 auto;
  margin-top: 150px; /* 명시적으로 추가 */
  margin-bottom: 100px;
`;

// 유저 정보 섹션 컨테이너
export const Userinfo = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: start; /* 중앙 정렬 */
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 250px;
  padding-bottom: 20px;
  gap: 20px; /* 프로필과 정보 간 간격 */
  max-width: 700px; /* 전체 영역의 너비 */
  /* background-color: white; */
  margin: 0 auto;
`;

// 유저 프로필 이미지 섹션
export const UserProfile = styled.div`
  display: flex;
  align-items: center; /* 중앙 정렬 */
  gap: 10px;

  img {
    display: flex;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

// 닉네임 및 이메일 섹션
export const Userpage = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap: 15px; /* 항목 간 간격 */
`;

// 닉네임/이메일 정보 하나의 행을 수평 배치
export const UserDetail = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px;
`;

// 라벨 스타일
export const Label = styled.div`
  font-weight: bold; /* 굵은 텍스트 */
  min-width: 80px; /* 일정한 너비 */
`;

// 닉네임 텍스트 스타일
export const Usernickname = styled.div`
  font-size: 16px;
  color: #333;
`;

// 이메일 텍스트 스타일
export const Useremail = styled.div`
  font-size: 16px;
  color: #555;
`;

// 푸터 영역 스타일
export const Footer = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  max-width: 700px; /* 전체 영역의 너비 */
  /* background-color: white; */
  margin: 0 auto;
  margin-top: 50px;

  button {
    font-size: 16px;
    cursor: pointer;
    padding: 8px 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    background-color: rgba(255, 255, 255, 1);
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
      color: rgba(255, 255, 255, 1);
    }
  }
`;
export const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  /* margin: auto; */
  /* align-items: center; */
  /* justify-content: center; */
`;
