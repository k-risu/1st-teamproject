import styled from "@emotion/styled";
import { FaExchangeAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

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

// 모달 컨텐츠 스타일
export const ModalContent = styled.div`
  background: white;
  min-width: 500px;
  min-height: 425px;
  padding: 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  text-align: left;
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
export const UserinfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* padding-left: 40px; */
  margin-bottom: 10px;
  h2 {
    margin-left: 40px;
    font-size: 24px;
    align-self: flex-start;
  }
  div {
    align-items: center;
    justify-content: center;
    margin-right: 40px;
  }
`;
export const ChangeIcon = styled(FaExchangeAlt)`
  font-size: 20px;
  margin-right: 5px;
  cursor: pointer;
`;
export const DeleteIcon = styled(RiDeleteBin6Fill)`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 5px;
  cursor: pointer;
`;
export const BtWrap = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  gap: 75px;

  & > button {
    background-color: #dfdfdf !important;
    color: #000 !important;
    padding: 5px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
    margin-top: 15px;
  }
`;
