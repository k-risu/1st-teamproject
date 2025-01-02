import styled from "@emotion/styled";
import { FaSistrix } from "react-icons/fa6";

const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 500px;
  min-height: 425px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 추가: 수평 중앙 정렬 */
  justify-content: space-between; /* 각 항목을 적절히 배치 */
  gap: 10px;

  h2 {
    padding-left: 30px;
    font-size: 24px;
    align-self: flex-start;
  }

  label {
    font-size: 18px;
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

  button:hover {
    background-color: #b4b4b4;
  }
`;
export const ButtonWrapper = styled.div`
  ${alignment}
  gap: 5vw;
  /* justify-content: space-between; */
  width: 100%;
`;
export const ModalText = styled.textarea`
  padding: 4.5px;
  font-size: 18px;
  width: 400px;
  border-radius: 5px;
  border: 2px solid #7a7a7a;
  background-color: #f4f4f4;
  height: 250px;
  resize: none;

  display: block;
  margin: auto; /* 추가: 텍스트 영역을 부모 내에서 자동으로 중앙 정렬 */
  &:focus {
    outline: none;
    border: 2px solid #7a7a7a;
  }
  ${(props) => props.readOnly}
  cursor: default;
`;
export const ModalInput = styled.input`
  width: 400px;
  border-radius: ${(props) => (props.userInfo ? "5px 5px 0px 0px" : "5px")};
  border: 2px solid #f4f4f4;
  background-color: #f4f4f4;

  padding: 10px;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 2px solid #f4f4f4;
  }
`;
export const FindDiv = styled.div`
  position: absolute;
  display: flex;
  width: 400px;
  border-radius: 0 0 5px 5px;
  border: 2px solid #f4f4f4;
  background-color: #f4f4f4;

  left: 50px;
  top: 60px;

  font-size: 16px;
  align-items: center;
  cursor: pointer;
  z-index: 99;

  &:hover {
    border: 2px solid #999999;
    background-color: #999999;
  }

  img {
    display: flex;
    margin-left: 5px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #c0c0c0;
    border-radius: 5px;
  }
  div {
    margin-left: 5px;
    width: 30px;
    height: 30px;
    background-color: #c0c0c0;
    border-radius: 15px;
    font-size: 0;
  }
  span {
    padding: 10px;
  }
`;
export const SearchMember = styled(FaSistrix)`
  position: absolute;
  display: flex;
  top: 25px;
  right: 15px;
  font-size: 30px;
`;
