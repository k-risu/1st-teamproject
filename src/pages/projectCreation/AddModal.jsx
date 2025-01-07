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
} from "./AddModal.styles";
import axios from "axios";
import Swal from "sweetalert2";
import { FiDelete } from "react-icons/fi";

const AddModal = ({
  isOpen,
  closeModal,
  addTeamMember,
  teamMembers,
  setTeamMembers,
}) => {
  const [memberList, setMemberList] = useState([...teamMembers]);
  const [userInfo, setUserInfo] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  if (!isOpen) return null;

  const handleAddMemberButton = (item) => {
    if (teamMembers.some((member) => member.userNo === item.userNo)) {
      console.log(teamMembers);

      Swal.fire({
        icon: "warning",
        title: "이미 추가된 사용자입니다.",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      return;
    }

    const clickUserData = userInfo.find(
      (member) => member.userNo === item.userNo,
    );

    const userNickname = clickUserData.nickname.split("#")[0];

    Swal.fire({
      icon: "success",
      title: `${userNickname}님을 추가했어요.`,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    setTeamMembers((prev) => [...prev, item]);
    setMemberList((prev) => [...prev, item]);
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
          timer: 1500,
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
      console.log(error);
    }
  };

  const handleDelete = (e) => {
    const deleteMember = memberList.reduce((list, item) => {
      if (item.userNo !== e.userNo) list.push(item);
      return list;
    });

    if (deleteMember.userNo === e.userNo) {
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
      setTeamMembers([deleteMember]);
      setMemberList([deleteMember]);
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
                      handleAddMemberButton(item);
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
                      handleAddMemberButton(item);
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
            {memberList.map((item) => (
              <div key={item.userNo}>
                <span>{item.nickname}</span>
                <FiDelete onClick={() => handleDelete(item)} />
              </div>
            ))}
          </ModalText>
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
