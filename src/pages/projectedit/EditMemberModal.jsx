import { useState } from "react";
import {
  ButtonWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
  ModalText,
  FindDiv,
  SearchMember,
  FindUserData,
  ModalUser,
} from "./EditMemberModal.styles";
import axios from "axios";
import Swal from "sweetalert2";
import { FiDelete } from "react-icons/fi";

const EditMemberModal = ({
  isOpen,
  closeModal,
  addTeamMember,
  teamMembers,
  setTeamMembers,
}) => {
  const [memberList, setMemberList] = useState([
    teamMembers.map((item) => [...item.nickname]),
  ]);
  const [membersData, setMembersData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  if (!isOpen) return null;

  const handleAddMemberButton = (e) => {
    const clickUserData = userInfo.filter((item) => {
      return item.userNo === e;
    });
    const userNickname = clickUserData[0].nickname.substring(
      0,
      clickUserData[0].nickname?.indexOf("#"),
    );

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: `${userNickname}님을 추가했어요`,
    });
    console.log(teamMembers);
    console.log(userNickname);
    console.log(clickUserData);

    setTeamMembers((teamMembers) => [...teamMembers, clickUserData]);
    setMembersData((teamMembers) => [...teamMembers, clickUserData]);
    setMemberList((prev) => [...prev, userNickname]);
    setSearchInput("");
    setUserInfo([]);
  };

  const handleSearch = async () => {
    try {
      const seacrchNickname = encodeURIComponent(searchInput.trim());

      const res = await axios.get(
        `/api/project/search-user/${seacrchNickname}`,
      );
      if (res.data.code === "OK") {
        setUserInfo(res.data.userList);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "해당 사용자를 찾을 수 없습니다",
        });
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("해당 사용자를 찾을 수 없습니다");
    }
  };

  const handleDelete = (e) => {
    const deleteMember = memberList.flat().filter((item) => item !== e);

    if (teamMembers[0].nickname === deleteMember[0]) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "해당 사용자는 삭제할 수 없습니다",
      });
    } else {
      setMemberList(deleteMember);
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalInput
          placeholder="닉네임을 검색해보세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchMember
          onClick={() => {
            handleSearch();
          }}
        />
        <h2>구성원</h2>
        {/* 사용자 정보 출력 부분 */}
        {userInfo && (
          <FindDiv>
            {userInfo.map((item, index) => {
              if (item.pic === null) {
                return (
                  <FindUserData
                    key={index}
                    onClick={() => {
                      handleAddMemberButton(item.userNo);
                    }}
                  >
                    <img src="/default_profile.jpg" alt="Default Profile" />
                    <span>{item.nickname}</span>
                  </FindUserData>
                );
              } else {
                return (
                  <FindUserData
                    key={index}
                    onClick={() => {
                      handleAddMemberButton(item.userNo);
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`}
                    />
                    <span>{item.nickname}</span>
                  </FindUserData>
                );
              }
            })}
          </FindDiv>
        )}
        <div>
          <ModalText>
            {teamMembers.map((item) => (
              <div key={item.userNo}>
                <ModalUser>
                  <span>{item?.nickname}</span>
                  <FiDelete
                    aria-label={`Delete ${item.nickname}`}
                    onClick={() => handleDelete(item.nickname)}
                  />
                </ModalUser>
              </div>
            ))}
          </ModalText>
        </div>
        <ButtonWrapper>
          <button type="button" onClick={() => addTeamMember(membersData)}>
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

export default EditMemberModal;
