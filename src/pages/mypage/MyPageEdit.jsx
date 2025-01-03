import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "./components/ProfileImage";
import UserForm from "./components/UserForm";
import useFetchUserInfo from "./hooks/useFetchUserInfo";
import { Container, Header, ProfileWrapper } from "./MyPageEdit.styled";

function MyPageEdit() {
  const [pic, setPic] = useState(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 확인 상태
  const [userInfo, setUserInfo] = useState({
    email: "",
    userId: "",
    nickname: "",
    statusMessage: "",
    pic: "",
  });
  const [cookies] = useCookies(["signedUserNo"]);
  const navigate = useNavigate();
  const location = useLocation();
  const signedUserNo = cookies.signedUserNo;
  const targetUserNo =
    new URLSearchParams(location.search).get("targetUserNo") || signedUserNo;

  // Fetch user info
  useFetchUserInfo({
    targetUserNo,
    setUserInfo,
    signedUserNo,
    navigate,
    setValue: null, // React Hook Form 값 사용 시 적용
    setIsLoading: null, // 로딩 상태 사용 시 적용
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPic(file);
    }
  };

  const handleCheckNickname = async () => {
    if (!userInfo.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get("/api/user", {
        params: { targetUserNo, nickname: userInfo.nickname },
      });

      if (response.data.code === "DN") {
        alert("닉네임이 중복되었습니다.");
        setIsNicknameChecked(false);
      } else {
        alert("닉네임이 사용 가능합니다.");
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("닉네임 확인 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("targetUserNo", targetUserNo);
      formData.append("nickname", userInfo.nickname.trim());
      formData.append("statusMessage", userInfo.statusMessage.trim());
      if (pic) formData.append("pic", pic);

      console.log("전송 데이터:", [...formData.entries()]);

      const response = await axios.put("/api/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.code === "OK") {
        alert("정보 변경이 완료되었습니다.");
        navigate("/mypage");
      } else if (response.data.code === "DN") {
        alert("닉네임이 중복되었습니다.");
        setIsNicknameChecked(false);
      } else {
        console.error("서버 응답 데이터:", response.data);
        alert("정보 저장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("정보 저장 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <h2>정보 변경 페이지</h2>
      </Header>
      <ProfileWrapper>
        <ProfileImage
          pic={pic || userInfo.pic}
          targetUserNo={targetUserNo}
          handleImageChange={handleImageChange}
        />
      </ProfileWrapper>
      <UserForm
        email={userInfo.email}
        userId={userInfo.userId}
        nickname={userInfo.nickname}
        onNicknameChange={(e) =>
          setUserInfo({ ...userInfo, nickname: e.target.value })
        }
        isNicknameChecked={isNicknameChecked}
        handleCheckNickname={handleCheckNickname}
        statusMessage={userInfo.statusMessage}
        onStatusMessageChange={(e) =>
          setUserInfo({ ...userInfo, statusMessage: e.target.value })
        }
        isEditable
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default MyPageEdit;
