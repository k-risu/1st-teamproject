import { useState } from "react";
import {
  ButtonWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
  ModalText,
  FindDiv,
  SearchMember,
  SearchProfile,
} from "./AddModal.styles";
import axios from "axios";

const AddModal = ({ isOpen, closeModal, addTeamMember, setTeamMembers }) => {
  const [memberList, setMemberList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  if (!isOpen) return null;

  const handleAddMemberButton = async (data) => {
    console.log(data);

    if (data === null) {
      alert("해당 사용자를 찾을 수 없습니다");
    } else {
      setTeamMembers((prev) => [...prev, data]);
      setMemberList((prev) => [...prev, data.nickname]);
      setSearchInput("");
    }
  };

  const handleSearch = async () => {
    try {
      const seacrchNickname = encodeURIComponent(searchInput.trim());

      const res = await axios.get(
        `/api/project/search-user/${seacrchNickname}`,
      );
      console.log(res);

      if (res.status === 200) {
        setUserInfo(res.data.user);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("해당 사용자를 찾을 수 없습니다");
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await handleSearch();
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalInput
          placeholder="닉네임 또는 이메일로 검색해보세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <SearchMember
          onClick={() => {
            handleSearch();
          }}
        />
        <h2>구성원</h2>
        {/* 사용자 정보 출력 부분 */}
        {userInfo && (
          <FindDiv
            onClcik={() => {
              handleAddMemberButton(userInfo);
            }}
          >
            {userInfo?.pic === null ? (
              <img src="public/profile8.jpg" />
            ) : (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/pic/user/${userInfo.userNo}/${userInfo.pic}`}
              />
            )}
            <span>{userInfo?.nickname}</span>
          </FindDiv>
        )}
        <div>
          <ModalText readOnly value={[memberList]} />
        </div>
        <ButtonWrapper>
          <button type="button" onClick={() => addTeamMember(userInfo)}>
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
