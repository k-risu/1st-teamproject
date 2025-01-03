import styled from "@emotion/styled";
import { FaCheck } from "react-icons/fa";
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
  width: 500px;
  height: 425px;
  padding: 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* align-items: center; */

  h2 {
    margin-top: 15px;
    margin-left: 90px;
    margin-bottom: 20px;
  }

  div > button {
    background-color: #dfdfdf;
    color: #000;
    padding: 5px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
    margin-top: 15px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  li {
    margin: auto;
    width: 300px;
    height: 275px; /* 고정 높이 설정 */
    overflow-y: auto; /* 스크롤 추가 */
    display: flex;
    flex-direction: column; /* 세로 정렬 */
  }
  span {
    display: inline-block;
    width: 200px;
  }
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
`;
export const BtWrap = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  gap: 75px;
  margin: auto;
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
