import styled from "@emotion/styled";

// 모달 오버레이 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0); // 반투명 검정 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 내용 영역
export const ModalContent = styled.div`
  background: white;
  /* padding: 5px; */
  /* border-radius: 5px; */
  width: 100px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  position: absolute; // 절대 위치로 설정
  border: 1px solid #000;
`;

// 옵션 버튼 스타일
export const OptionButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 5px;
  width: 100%;
  /* margin-top: 5px; */
  /* border-radius: 5px; */
  cursor: pointer;
  /* border: 1px solid #000; */

  &:hover {
    /* background-color: #67da6f; */
  }

  &:first-of-type {
    /* background-color: #ff6b6b; // 나가기 버튼은 빨간색 */
  }
`;
export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: black; /* 검은색 선 */
  margin: 0 0; /* 버튼들 사이 간격 조정 */
`;
