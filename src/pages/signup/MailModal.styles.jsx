import styled from "@emotion/styled";

// 모달 오버레이
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 배경을 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
  padding: 20px;
`;

// 모달 내용 컨테이너
export const ModalContent = styled.div`
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: default; /* 모달 내용은 클릭할 수 없도록 */
  text-align: center;
`;

// 타이머 텍스트
export const TimerText = styled.span`
  display: inline-block;
  font-size: 15px;
  color: #333;
  margin-left: 10px; /* 타이머와 입력 필드 사이에 간격을 줍니다 */
  font-weight: bold;
`;

// 인증 버튼
export const VerifyButton = styled.button`
  border: none;

  font-size: 16px;
  cursor: pointer;
  width: 100%;

  padding: 9px 15px;
  background-color: #b4b4b4;
  border-radius: 8px;
  border: 1px solid #b4b4b4;

  &:disabled {
    color: #838383;
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// 모달 닫기 버튼
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;

  color: #333;
  &:hover {
    color: #ff1e00;
  }
`;

export const ModalInput = styled.input`
  padding: 4.5px;
  font-size: 18px;
  width: 400px; /* 입력 필드의 너비 설정 */
  border-radius: 5px;
  /* border: 2px solid #7a7a7a !important; */
  border: 2px solid #f4f4f4 !important;
  background-color: #f4f4f4;
  &:focus {
    outline: none;
    border: 2px solid #f4f4f4;
  }
`;

// div 안에서 input과 TimerText를 가로로 배치하고 중앙 정렬
export const InputAndTimerWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* input과 TimerText 사이의 간격 */
  width: 100%;
`;
