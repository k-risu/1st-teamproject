import styled from "@emotion/styled";

// 헤더 스타일
export const Header = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  padding: 20px;
  font-size: 15px;
  font-weight: bold;
  max-width: 800px;
  width: 100%; /* width 설정 추가 */
  background-color: white;
  margin: 0 auto;
  margin-bottom: 100px;
`;

// 폼 스타일
export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  max-width: 800px;
  width: 100%; /* width 설정 추가 */

  background-color: white;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// 프로필 이미지 섹션 컨테이너
export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px; /* 이미지와 버튼 간 간격 */
  max-width: 800px;
  width: 100%; /* width 설정 추가 */
  background-color: white;
  margin: 0 auto 20px;
`;

// 라벨 스타일
export const Label = styled.label`
  width: 100px; /* 일정한 너비로 통일 */
  font-size: 14px;
  font-weight: bold;
  text-align: right; /* 텍스트 오른쪽 정렬 */
  margin-right: 10px; /* 입력 필드와 간격 */
`;

// 입력 필드 스타일
export const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 400px; /* 고정 너비 설정 */

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// 입력 필드와 버튼 컨테이너 (수평 정렬)
export const InputWrapper = styled.div`
  display: flex;
  align-items: center; /* 수평 정렬 */
  gap: 10px; /* 필드와 버튼 간 간격 */
  width: 100%; /* 부모 영역 맞춤 */
  margin-bottom: 10px;
`;

// 중복 확인 버튼
export const CheckButton = styled.button`
  padding: 10px;
  background-color: ${({ isAvailable }) => (isAvailable ? "green" : "gray")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ isAvailable }) => (isAvailable ? "pointer" : "not-allowed")};
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.6)};

  &:hover {
    background-color: ${({ isAvailable }) =>
      isAvailable ? "#008000" : "#808080"};
  }
`;
