import styled from "@emotion/styled";
import { FaExchangeAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

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
  z-index: 999; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
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
`;
export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 10px;
  h2 {
    padding-left: 50px;

    font-size: 24px;
    align-self: flex-start;
  }
`;
export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
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
export const ChangeIcon = styled(FaExchangeAlt)`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
export const DeleteIcon = styled(RiDeleteBin6Fill)`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
export const EditIcon = styled(FiEdit)`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

export const BtWrap = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  gap: 75px;
  /* justify-content: space-between; */
  margin-bottom: 15px;

  button {
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

export const UserWrap = styled.li`
  margin: auto;
  width: 300px;
  height: 275px; /* 고정 높이 설정 */
  overflow-y: auto; /* 스크롤 추가 */
  display: flex;
  flex-direction: column; /* 세로 정렬 */
`;
export const NoImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #c0c0c0;
  /* flex-shrink: 0; 크기 고정을 위한 추가 */
`;
export const CheckedIcon = styled(FaCheck)`
  margin-left: 15px;
  min-width: 20px; /* 추가 */
  min-height: 20px;
  font-size: 15px;
  color: ${(props) => (props.checked ? "#77da69" : "#dedede")};
`;
export const MembersWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f4f4f4;

  cursor: pointer;
  &:hover {
    background-color: #999999;
  }

  span {
    display: inline-block;
    width: 200px;
    text-align: left;
  }
`;
