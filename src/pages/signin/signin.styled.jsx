import styled from "@emotion/styled";

export const SigninContainer = styled.div`
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
  background-color: #f9f9f9; /* 배경색 추가 */
`;

export const PrevButton = styled.button`
  position: absolute; /* 부모 요소 안에서 위치 설정 */
  left: 10px; /* 좌측 끝으로 이동 */
  top: 50%; /* 부모 요소의 중앙에 위치 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 마우스 커서 변경 */
  font-size: 24px; /* 아이콘 크기 조정 */
`;

export const SigninBox = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: space-between; /* 좌우 정렬 */
  position: relative; /* 제목을 중앙에 위치시키기 위한 기준 */
  width: 600px; /* 로그인 박스 너비 */
  padding: 10px;
  background-color: none; /* 배경색 제거 */
  border-radius: 8px; /* 둥근 테두리 */
`;

export const SigninTitle = styled.h1`
  margin: 0 auto; /* 자동 마진으로 가로 중앙 정렬 */
  font-size: 20px; /* 제목 글씨 크기 */
  font-weight: bold; /* 굵은 글씨 */
  text-align: center; /* 텍스트 중앙 정렬 */
  padding: 30px; /* 제목 상하 여백 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 부모 요소의 전체 너비 사용 */
`;
// SigninLabel 스타일 정의 추가
export const SigninLabel = styled.h2`
  margin: 0;
  width: 70px; /* 레이블의 너비 고정 */
  font-size: 16px;
  font-weight: 500;
`;

export const SigninMailBox = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-start; /* 레이블과 입력 필드를 왼쪽 정렬 */
  margin-bottom: 16px; /* 하단 여백 */
  width: 500px; /* 입력 필드와 버튼 그룹 너비를 동일하게 설정 */
`;

export const SigninPwBox = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-start; /* 레이블과 입력 필드를 왼쪽 정렬 */
  margin-bottom: 16px; /* 하단 여백 */
  width: 500px; /* 입력 필드와 버튼 그룹 너비를 동일하게 설정 */
`;

export const SigninBoxInputBox = styled.input`
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f6f6f6;
  font-size: 14px;
  margin-left: 10px; /* 레이블과 입력 필드 간 간격 추가 */

  outline: none;

  &:focus {
    border: 1px solid #007bff; /* 포커스 시 테두리 강조 */
  }
`;

export const SigninBoxSigninbt = styled.button`
  max-width: 150px;
  width: 50%; /* 버튼이 너무 작지 않도록 너비 조정 */
  padding: 7px 0px; /* 버튼 내부 여백 */
  background-color: #f3f3f3; /* 메인 버튼 배경색 */
  color: black; /* 버튼 텍스트 색상 */
  border: 1px solid #f6f6f6; /* 테두리에 색상 추가 */
  border-radius: 8px; /* 버튼 모서리를 둥글게 */
  font-size: 16px; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 강조 */
  margin-top: 20px; /* 버튼과 상단 요소 간 간격 */
  cursor: pointer; /* 포인터 커서 표시 */
  transition: background-color 0.3s ease; /* 호버 시 부드러운 색상 전환 효과 */

  &:hover {
    background-color: #0056b3; /* 호버 효과로 더 어두운 색상 */
  }

  &:active {
    background-color: #003d80; /* 클릭 시 색상 */
  }
`;

export const ButtonGroup = styled.div`
  border: 1px solid #f6f6f6; /* 테두리에 색상 추가 */

  display: flex;
  justify-content: center; /* 모든 버튼을 가운데 정렬 */
  gap: 15px; /* 버튼 간 간격 */
  margin-top: 20px; /* 그룹 상단 간격 */
  flex-wrap: wrap; /* 화면 크기에 따라 버튼이 줄바꿈되도록 설정 */
`;

export const SigninBoxGroupbt = styled.button`
  padding: 10px 20px; /* 버튼 내부 여백 */
  border: 1px solid #f6f6f6; /* 테두리에 색상 추가 */
  border-radius: 8px; /* 버튼 모서리를 둥글게 */
  background-color: transparent; /* 버튼 배경 투명 */
  color: "black"; /* 버튼 텍스트 색상 */
  font-size: 14px; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 강조 */
  cursor: pointer; /* 포인터 커서 표시 */
  transition: all 0.3s ease; /* 호버 효과 부드럽게 */

  &:hover {
    background-color: #007bff; /* 배경색 변경 */
    color: white; /* 텍스트 색상 변경 */
  }

  &:active {
    background-color: #0056b3; /* 클릭 시 색상 */
    border-color: #0056b3; /* 클릭 시 테두리 색상 변경 */
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 400px;
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로로 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

export const PopupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  gap: 10px; /* 입력 필드와 버튼 간격 */
`;

export const ResetButton = styled.button`
  display: inline-flex; /* 텍스트와 버튼을 함께 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  padding: 10px 20px; /* 텍스트 주변 여백 */
  border-radius: 4px; /* 버튼 모서리를 둥글게 */
  font-size: 1rem; /* 글자 크기 */
  background-color: #f6f6f6; /* 버튼 배경색 */
  color: #000; /* 텍스트 색상 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 포인터 커서 표시 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  transition:
    background-color 0.3s ease,
    transform 0.2s ease; /* 부드러운 전환 효과 */

  &:hover {
    background-color: #007bff; /* 호버 시 배경색 변경 */
    color: white; /* 호버 시 텍스트 색상 변경 */
  }

  &:active {
    transform: scale(0.95); /* 클릭 시 살짝 눌리는 효과 */
    background-color: #0056b3; /* 클릭 시 배경색 */
  }
`;
