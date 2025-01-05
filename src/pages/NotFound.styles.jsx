import styled from "@emotion/styled";

// 전체 레이아웃 스타일
export const NotFoundLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  color: #495057; /* 텍스트 기본 색 */
  width: 100vw;
  height: 100vh;
`;

// 내용물을 감싸는 중간 div
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: -100px; /* 전체 내용을 100px 위로 이동 */
`;

// 아이콘 스타일
export const SadIcon = styled.div`
  font-size: 5rem;
  color: #ff6b6b; /* 빨간색 계열 */
  margin-bottom: 1rem;
`;

// 제목 스타일
export const NotFoundTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 1rem;
`;

// 설명 텍스트 스타일
export const NotFoundDescription = styled.span`
  font-size: 1.2rem;
  color: #868e96; /* 중간 회색 */
  margin-bottom: 2rem;
`;

// 추가 아이콘 스타일
export const CalendarIcon = styled.div`
  font-size: 3rem;
  color: #495057; /* 기본 회색 */
  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  gap: 15px;
  span {
    font-size: 20px;
  }
`;
