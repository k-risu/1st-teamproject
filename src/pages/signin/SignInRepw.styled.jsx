import styled from "@emotion/styled";

export const SigninRepwContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px; /* 위아래로 충분한 여백 추가 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const RepwTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px; /* 제목 아래 여백 추가 */
  margin-top: 0; /* 제목 위 여백 추가 */
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  flex-direction: column; /* 수직 정렬 */
  gap: 10px; /* Label과 Input 간격 */
`;

export const LabelInputWrapper = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 10px; /* Label과 InputBox 간 간격 */
`;

export const RepwLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  flex-shrink: 0; /* Label 크기를 일정하게 유지 */
  width: 120px; /* Label 고정 너비 설정 */
  text-align: center;
`;

export const RepwInputBox = styled.input`
  width: 400px; /* 입력 필드 고정 너비 설정 */
  height: 40px; /* 입력 필드 고정 높이 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f6f6f6;
  outline: none;

  &:focus {
    border-color: #007bff;
    background-color: #fff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;

export const ResetButton = styled.button`
  width: 150px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block; /* 버튼을 블록으로 변환 */
  margin: 20px auto; /* 중간 정렬 */

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

  &:active {
    background-color: #003d80;
  }
`;
