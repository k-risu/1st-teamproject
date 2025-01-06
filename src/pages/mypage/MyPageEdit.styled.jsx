import styled from "@emotion/styled";

// 부모 컨테이너 스타일
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 헤더 영역 (페이지 상단 제목 또는 설명 표시)
export const Header = styled.div`
  padding: 20px;
  font-weight: bold;
  background-color: white;

  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  font-size: 15px;
  max-width: 700px; /* 부모 컨테이너 최대 너비 */
  width: 100%; /* 부모의 전체 너비를 차지 */
  margin: 0 auto;
  margin-bottom: 50px; /* 하단 여백 */
`;

// 폼 영역 (정보 수정 입력 필드 및 버튼 그룹을 포함)
export const EditForm = styled.form`
  display: flex;
  flex-direction: column; /* 입력 필드와 버튼을 세로로 배치 */
  align-items: start; /* 입력 필드 및 버튼 정렬 */
  gap: 20px; /* 각 항목 간 간격 */
  max-width: 700px; /* 부모 컨테이너 최대 너비 */
  width: 100%; /* 부모의 전체 너비를 차지 */

  margin: 0 auto; /* 수평 가운데 정렬 */

  padding: 20px; /* 내부 여백 */
  border-radius: 10px; /* 둥근 모서리 */
  background-color: white; /* 배경 색상 */
`;

// 프로필 이미지 영역 (프로필 사진과 업로드 버튼 포함)
export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  flex-direction: column; /* 세로 방향으로 배치 */
  gap: 20px; /* 이미지와 버튼 간 간격 */
  max-width: 700px; /* 부모 컨테이너 최대 너비 */
  width: 100%; /* 부모의 전체 너비를 차지 */
  background-color: white; /* 배경 색상 */
  margin: 0 auto 50px; /* 수평 가운데 정렬, 하단 여백 */
`;

// 프로필 이미지 스타일
export const UserImage = styled.img`
  display: flex;
  width: 150px; /* 이미지 너비 */
  height: 150px; /* 이미지 높이 */
  border-radius: 50%; /* 둥근 모서리로 설정 */
  border: 3px solid #ddd; /* 외곽선 */
  object-fit: cover; /* 이미지를 컨테이너에 맞게 조정 */
  cursor: pointer; /* 커서 포인터로 설정 */
`;

// 라벨 영역 (입력 필드 앞의 텍스트 라벨)
export const Label = styled.label`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 100px; /* 일정한 너비로 통일 */
  font-size: 14px;
  font-weight: bold;
  text-align: center; /* 텍스트 가운데 정렬 */
  margin-right: 10px; /* 입력 필드와의 간격 */
`;

// 닉네임 입력 및 중복 확인 버튼을 포함하는 컨테이너
export const NicknameInput = styled.input`
  width: 400px; /* 동일한 너비 설정 */
  padding: 10px; /* 내부 여백 */
  border: 1px solid #ddd; /* 외곽선 색상 */
  border-radius: 8px; /* 둥근 모서리 */
  font-size: 14px; /* 글자 크기 */

  &:focus {
    border-color: #007bff; /* 포커스 시 외곽선 색상 */
    outline: none; /* 기본 아웃라인 제거 */
  }
`;

export const NicknameContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between; /* 입력 필드와 버튼 간격 유지 */
  gap: 10px; /* 필드와 버튼 간 간격 */
  max-width: 700px; /* 최대 너비 설정 */
`;

// 입력 필드와 버튼을 포함하는 컨테이너 (닉네임 입력 및 중복 확인 버튼 포함)
export const InputWrapper = styled.div`
  display: flex; /* 내부 요소를 수평 배치 */
  align-items: center; /* 수직 정렬 */
  gap: 10px; /* 필드와 버튼 간 간격 */
  width: 100%; /* 부모 영역 맞춤 */
  margin-bottom: 10px; /* 하단 여백 */
  margin: 0 auto;
`;
/// 입력 필드 영역 (사용자 입력을 받는 곳)
export const InputField = styled.input`
  max-width: 400px;
  flex: 1; /* 남은 공간을 모두 차지 */
  height: 40px; /* 버튼과 동일한 높이 설정 */
  font-size: 14px; /* 글자 크기 */

  padding: 8px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-weight: 600;

  &:focus {
    border-color: #007bff; /* 포커스 시 외곽선 색상 */
    outline: none; /* 기본 아웃라인 제거 */
  }
`;

/// 중복 확인 버튼 (닉네임 중복 여부를 확인하는 버튼)
export const CheckButton = styled.button`
  padding: 8px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-weight: 600;
  height: 40px; /* 입력 필드와 동일한 높이 설정 */
  font-size: 14px; /* 글자 크기 */
  white-space: nowrap; /* 글자 줄바꿈 방지 */

  color: rgba(0, 0, 0, 1);
  background-color: rgba(255, 255, 255, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 1);
  }
`;

// 정보 변경 버튼
export const SubmitButton = styled.button`
  padding: 8px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-weight: 600;
  border: none;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0; /* 크기 유지 */
  margin: 0 auto;

  color: rgba(0, 0, 0, 1);
  background-color: rgba(255, 255, 255, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 1);
  }
`;
