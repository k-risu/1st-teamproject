import { useState } from "react";

import {
  ButtonWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
  ModalText,
  DetailMember,
  FindDiv,
} from "./AddModal.styles";
import axios from "axios";

export const AddModal = ({ isOpen, closeModal, addTeamMember }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  // const { searchID, setSearchID } = useState("");
  const [add, setAdd] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const handleAddMember = () => {
    // 여기서 예시로 이메일을 팀원 데이터로 사용
    const member = {
      userNo: "1",
      nickname: "John Doe",
      pic: "",
      existSchedule: "true",
    };

    // addTeamMember 콜백을 사용하여 부모 컴포넌트로 데이터 전달
    addTeamMember(member);
    closeModal(); // 모달 닫기
  };
  const handleInputChange = async (e) => {
    try {
      const userId = encodeURIComponent(e.target.value); // 인코딩
      const response = await axios.get(`/api/project/search-user/${userId}`);
      if (response.status === 200) {
        console.log("성공 : ", response.data);
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalInput
          placeholder="닉네임 또는 이메일로 검색해보세요"
          onChange={handleInputChange}
          userInfo={userInfo}
        />
        <DetailMember />
        <h2>구성원</h2>

        {/* 사용자 정보 출력 부분 */}
        {userInfo && (
          <FindDiv>
            {userInfo.pic === true ? (
              <img src={userInfo.pic} />
            ) : (
              <div>없음</div>
            )}
            <span>{userInfo.nickname}</span>
          </FindDiv>
        )}
        <div>
          <ModalText readOnly />
        </div>
        <ButtonWrapper>
          <button type="button" onClick={handleAddMember}>
            추가
          </button>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
