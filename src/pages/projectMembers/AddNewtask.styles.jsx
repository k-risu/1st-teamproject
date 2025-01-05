import styled from "@emotion/styled";

// 모달 오버레이 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
`;

export const ModalContent = styled.div`
  background: white;
  /* padding: 5px; */
  /* border-radius: 5px; */
  min-width: 500px;
  min-height: 425px;
  text-align: center;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* border: 1px solid #000; */

  h2 {
    padding-left: 50px;
    margin-bottom: 10px;
    font-size: 24px;
    align-self: flex-start;
  }
  div {
    width: 400px;
    display: flex;
    justify-content: center;
    gap: 75px;
    /* justify-content: space-between; */
  }
  div > button {
    background-color: #dfdfdf;
    color: #000;
    padding: 5px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    font-size: 15px;
  }
`;
export const ModalInput = styled.input`
  width: 400px;
  padding: 5px;
  font-size: 18px;
  border-radius: 5px;
  border: 2px solid #7a7a7a;
  background-color: #f4f4f4;
  background-color: #f4f4f4;

  padding: 10px;

  margin-bottom: 15px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
export const ModalText = styled.textarea`
  width: 400px;
  height: 250px;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #7a7a7a;
  background-color: #f4f4f4;
  resize: none;

  display: block;
  &:focus {
    outline: none;
  }
`;
