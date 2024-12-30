import { useState } from "react";
import {
  ButtonWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
  ModalText,
  FindDiv,
  SearchMember,
} from "./AddModal.styles";
import axios from "axios";

const AddModal = ({ isOpen, closeModal, addTeamMember }) => {
  const [add, setAdd] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  if (!isOpen) return null;

  const handleAddMemberButton = (userInfo) => {
    console.log(userInfo);

    setAdd((prev) => [...prev, userInfo]);
    setSearchInput("");
  };

  const handleAddMember = () => {
    const member = {
      userNo: userInfo.userNo,
      nickname: userInfo.nickname,
      pic: userInfo.pic,
      existSchedule: userInfo.existSchedule,
    };
    console.log(userInfo);

    addTeamMember((prev) => [...prev, member]);
    closeModal();
  };

  const handleSearch = async (e) => {
    setSearchInput(e.target.value);
    try {
      const seacrchNickname = encodeURIComponent(e.target.value);
      const res = await axios.get(
        `/api/project/search-user/${seacrchNickname}`,
      );
      console.log(res);

      if (res.status === 200) {
        setUserInfo(res.data.user);
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
          value={searchInput}
          onChange={handleSearch}
        />
        <SearchMember
          onClick={() => {
            handleAddMemberButton(userInfo.nickname);
          }}
        />
        <h2>구성원</h2>
        {/* 사용자 정보 출력 부분 */}
        {userInfo && (
          <FindDiv
            onClcik={() => {
              handleAddMemberButton(userInfo.nickname);
            }}
          >
            {userInfo?.pic === true ? <img src={userInfo?.pic} /> : <div></div>}
            <span>{userInfo?.nickname}</span>
          </FindDiv>
        )}
        <div>
          <ModalText readOnly value={[add]} />
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

export default AddModal;
