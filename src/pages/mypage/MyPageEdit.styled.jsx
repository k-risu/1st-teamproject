import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: none;
  border-radius: 20px;
  background-color: none;
  font-size: 12px;
  font-weight: bold;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* 중간에서 좌측으로 위치 */
  align-items: center;
  margin: 20px auto;
  max-width: 900px;
`;

export const UserImage = styled.div`
  cursor: pointer;
  img {
    border: 1px solid #ddd;
    border-radius: 50%;
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  margin: 20px auto;
  max-width: 900px;
`;

export const Label = styled.label`
  width: 100px; /* 일정한 너비로 통일 */
  font-size: 14px;
  font-weight: bold;
  text-align: center; /* 텍스트 정렬 */
  margin-right: 10px; /* 입력 필드와 간격 */
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 라벨과 입력 필드 간격 */
  margin-bottom: 10px;
`;

export const InputField = styled.input`
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 400px; /* 고정 너비 설정 */
  flex-shrink: 0; /* 버튼과 충돌 방지 */

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 입력 필드와 버튼 간 간격 */
  margin-top: 5px; /* 버튼 그룹과 입력 필드 간격 추가 */
`;

export const SubmitButton = styled.button`
  padding: 3px 10px; /* 글자 크기에 맞게 패딩 조정 */
  background-color: #f4f4f4;
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap; /* 버튼 크기를 글자에 맞춤 */
  flex-shrink: 0; /* 버튼 크기 고정 */
  margin: 0 auto;

  &:hover {
    background-color: #1048c2;
    color: white;
  }
`;

export const NicknameInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const CheckButton = styled.button`
  background-color: ${({ isAvailable }) => (isAvailable ? "green" : "gray")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isAvailable }) =>
      isAvailable ? "#008000" : "#808080"};
  }
`;
