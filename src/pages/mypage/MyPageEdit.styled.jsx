import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  font-size: 12px;
  font-weight: bold;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* 중간에서 좌측으로 위치 */
  align-items: center;
  margin: 20px auto;
  padding-left: 100px; /* 좌측 여백 추가 */
  max-width: 900px;
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 중앙 정렬 */
  gap: 20px;
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
  align-items: center;
  gap: 20px;
  margin: 20px auto;
  max-width: 900px;
`;

export const Label = styled.label`
  min-width: 100px; /* 일정한 너비로 통일 */
  font-size: 14px;
  font-weight: bold;
  text-align: left; /* 좌측 정렬 */
  margin-right: 10px; /* 입력 필드와 간격 */
`;

export const InputField = styled.input`
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

export const SubmitButton = styled.button`
  padding: 5px 10px; /* 글자 크기에 맞게 패딩 조정 */
  background-color: #f4f4f4;
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap; /* 버튼 크기를 글자에 맞춤 */
  flex-shrink: 0; /* 버튼 크기 고정 */

  &:hover {
    background-color: #1048c2;
    color: white;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start; /* 입력 필드 옆에서 정렬 */
  align-items: center;
  gap: 10px; /* 입력 필드와 버튼 간 간격 */
  margin-top: 5px; /* 버튼 그룹과 입력 필드 간격 추가 */
`;
