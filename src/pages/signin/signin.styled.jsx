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
  max-width: 500px;
  width: 20%;
  padding: 5px;
  background-color: #f3f3f3;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  justify-content: space-between; /* 버튼 간 간격을 동일하게 설정 */
  margin-top: 10px;
  width: 500px; /* 이메일/비밀번호 박스와 동일한 너비 설정 */
  padding-left: 50px; /* 레이블 너비와 동일하게 왼쪽 여백 추가 */
`;

export const SigninBoxGroupbt = styled.button`
  flex: 1; /* 버튼 너비를 균등 분배 */
  margin: 0 10px; /* 버튼 간 간격 설정 */
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 50px;
  background-color: #f3f3f3;
  cursor: pointer;

  &:hover {
    background-color: #ddd; /* 호버 효과 */
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

export const ResetButton = styled(SigninBoxSigninbt)`
  margin-top: 15px;
  display: inline-block; /* 버튼 크기를 내용에 맞게 조정 */
  text-align: center; /* 텍스트 중앙 정렬 */
  padding: 10px 20px; /* 여백 추가 */
  width: auto; /* 너비를 내용에 맞게 조정 */
  border-radius: 4px; /* 버튼 모서리 둥글게 */
  font-size: 12px; /* 글자 크기 조정 */
  background-color: #333; /* 버튼 배경색 어두운 색상 */
  color: #fff; /* 텍스트 색상을 흰색으로 설정 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */

  &:hover {
    background-color: #444; /* 호버 시 약간 더 밝은 배경색 */
  }

  &:active {
    background-color: #222; /* 클릭 시 더 어두운 배경색 */
  }
`;
