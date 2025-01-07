import { useEffect, useState } from "react";
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
import { useCookies } from "react-cookie";

const EditMemberModal = ({
  isOpen,
  closeModal,
  addTeamMember,
  teamMembers,
  setTeamMembers,
}) => {
  const [membersData, setMembersData] = useState(teamMembers);
  const [userInfo, setUserInfo] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [cookies] = useCookies("signedUserNo");

  useEffect(() => {
    console.log("Updated teamMembers:", membersData);
  }, [membersData]);

  if (!isOpen) return null;

  const handleAddMemberButton = async (userNo) => {
    if (teamMembers.some((member) => member.userNo === userNo)) {
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

    const clickUserData = userInfo.find((item) => item.userNo === userNo);
    const userNickname = clickUserData.nickname.split("#")[0];

    const addUserForm = {
      ...clickUserData,
      scheduleList: [],
    };
    console.log(addUserForm);

    Swal.fire({
      icon: "success",
      title: `${userNickname}님을 추가했어요.`,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    setTeamMembers((prev) => [...prev, clickUserData]);
    setMembersData([...membersData, addUserForm]);
    setSearchInput("");
    setUserInfo([]);
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      Swal.fire("검색어를 입력해주세요.", "", "warning");
      return;
    }

    try {
      const seacrchNickname = encodeURIComponent(searchInput.trim());
      const res = await axios.get(
        `/api/project/search-user/${seacrchNickname}`,
      );
      if (res.data.code === "OK") {
        setUserInfo(res.data.userList);
      } else {
        Swal.fire("사용자를 찾을 수 없습니다.", "", "error");
      }
    } catch (error) {
      console.error("사용자 검색 중 오류 발생:", error);
      Swal.fire("검색 실패", "다시 시도해주세요.", "error");
    }
  };

  const handleDelete = async (e) => {
    console.log(e);

    const deleteMember = membersData.filter((item) => item.userNo !== e);
    const isNotDeleteUser = membersData.filter(
      (item) => item.scheduleList.length !== 0,
    );

    if (e === parseInt(cookies.signedUserNo)) {
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
        title: "해당 사용자는 삭제할 수 없습니다",
      });
    } else if (isNotDeleteUser[0].userNo === e) {
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
        title: "해당 사용자는 일정이 남아있습니다.",
      });
    } else {
      await setMembersData(deleteMember);
      await setTeamMembers(deleteMember);
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
            {membersData.map((item) => (
              <ModalUser key={item.userNo}>
                <span>{item.nickname}</span>
                <FiDelete onClick={() => handleDelete(item.userNo)} />
              </ModalUser>
            ))}
          </ModalText>
        </div>
        <ButtonWrapper>
          <button type="button" onClick={() => addTeamMember(teamMembers)}>
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
