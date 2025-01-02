import {
  Header,
  EditForm,
  InputField,
  SubmitButton,
  UserImage,
  Label,
  ButtonGroup,
  ProfileWrapper,
  InputWrapper,
} from "./MyPageEdit.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { TbCameraHeart } from "react-icons/tb";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

// 유효성 검증 스키마 정의
const schema = yup.object().shape({
  nickname: yup.string().required("닉네임을 입력해주세요."),
  statusMessage: yup.string().optional(),
});

function MyPageEdit() {
  const [profilePic, setProfilePic] = useState(null); // 프로필 이미지 상태
  const [userInfo, setUserInfo] = useState({
    email: "",
    userId: "",
    nickname: "",
    statusMessage: "",
    pic: "",
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 확인 상태
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["signedUserNo"]);
  const navigate = useNavigate();
  const location = useLocation();
  const signedUserNo = cookies.signedUserNo;

  const searchParams = new URLSearchParams(location.search);
  const targetUserNo = searchParams.get("targetUserNo") || signedUserNo;
  const isEditable = parseInt(targetUserNo) === parseInt(signedUserNo);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // 유저 정보 API 호출
    if (!signedUserNo) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/signin");
      return;
    }
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user", {
          params: { targetUserNo, signedUserNo },
        });

        console.log("API 응답 데이터:", response.data);

        if (response.data.code === "OK") {
          const {
            email = "example@mail.com",
            userId = "defaultUserId",
            nickname = "기본 닉네임",
            pic = "",
            statusMessage = "기본 상태 메시지",
          } = response.data;

          setUserInfo({ email, userId, nickname, statusMessage, pic });
          setValue("nickname", nickname);
          setValue("statusMessage", statusMessage || "기본 상태 메시지");
        } else {
          alert("유저 정보를 찾을 수 없습니다.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("유저 정보 가져오기 오류:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [targetUserNo, signedUserNo, navigate, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file || null);
  };

  const handleCheckNickname = async () => {
    const nickname = userInfo.nickname;
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/nickname-check", { nickname });
      if (response.data.code === "OK") {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      } else {
        alert("닉네임이 중복되었습니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      console.error("닉네임 확인 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const onSubmit = async (data) => {
    if (!isNicknameChecked) {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("targetUserNo", targetUserNo);
      formData.append("signedUserNo", signedUserNo);
      formData.append("nickname", data.nickname);
      formData.append("statusMessage", data.statusMessage);
      if (profilePic) formData.append("pic", profilePic);

      const response = await axios.put("/api/user", formData);

      switch (response.data.code) {
        case "OK":
          alert("정보가 성공적으로 저장되었습니다.");
          navigate("/mypage");
          break;
        case "DE":
          alert("이메일 중복 오류입니다.");
          break;
        case "PFE":
          alert("비밀번호 형식 오류입니다.");
          break;
        case "PCE":
          alert("비밀번호 확인 오류입니다.");
          break;
        case "DN":
          alert("닉네임 중복 오류입니다.");
          setIsNicknameChecked(false);
          break;
        case "NN":
          alert("입력 오류입니다.");
          break;
        default:
          alert("정보 저장 중 알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("정보 저장 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <Header>
        <h2>정보 변경 페이지</h2>
      </Header>
      <ProfileWrapper>
        <label htmlFor="profile-upload">
          <UserImage>
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : userInfo.pic
                    ? `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo}/${userInfo.pic}`
                    : "https://via.placeholder.com/150"
              }
              alt="프로필 이미지"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </UserImage>
        </label>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <TbCameraHeart
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => document.getElementById("profile-upload").click()}
          />
        </div>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </ProfileWrapper>
      <EditForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Label>아이디</Label>
          <InputField type="text" value={userInfo.userId} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>이메일</Label>
          <InputField type="text" value={userInfo.email} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>닉네임</Label>
          <InputField
            {...register("nickname")}
            onChange={(e) => {
              setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
              setIsNicknameChecked(false);
            }}
            disabled={!isEditable}
          />
          {isEditable && (
            <ButtonGroup>
              <SubmitButton type="button" onClick={handleCheckNickname}>
                {isNicknameChecked ? "사용 가능" : "중복 확인"}
              </SubmitButton>
            </ButtonGroup>
          )}
        </InputWrapper>
        {errors.nickname && (
          <p style={{ color: "red" }}>{errors.nickname.message}</p>
        )}
        <InputWrapper>
          <Label>상태 메시지</Label>
          <InputField {...register("statusMessage")} disabled={!isEditable} />
        </InputWrapper>
        {isEditable && <SubmitButton type="submit">정보변경 하기</SubmitButton>}
      </EditForm>
    </div>
  );
}

export default MyPageEdit;
