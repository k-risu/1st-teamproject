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
import { useState } from "react";
import { TbCameraHeart } from "react-icons/tb";
import axios from "axios";

// 유효성 검증 스키마 정의
const schema = yup.object().shape({
  nickname: yup.string().required("닉네임을 입력해주세요."),
});

function MyPageEdit() {
  const [profilePic, setProfilePic] = useState(null); // 프로필 이미지 상태

  // react-hook-form 초기화
  const {
    register,
    handleSubmit,
    formState: { errors }, // 유효성 검증 오류
  } = useForm({
    resolver: yupResolver(schema), // yup 스키마와 연결
  });

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("targetUserNo", 1); // targetUserNo는 예시 값
      formData.append("nickname", data.nickname);
      formData.append("statusMessage", "유저 상태메세지"); // 예시 메시지
      if (profilePic) {
        formData.append("pic", profilePic);
      } else {
        formData.append("pic", null);
      }

      const response = await axios.put("/api/user", formData);

      if (response.data.code === "OK") {
        alert("정보가 저장되었습니다.");
      } else {
        switch (response.data.code) {
          case "DE":
            alert("이메일 중복 오류가 발생했습니다.");
            break;
          case "DN":
            alert("닉네임 중복 오류가 발생했습니다.");
            break;
          case "NN":
            alert("입력 값에 오류가 있습니다.");
            break;
          default:
            alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // 이미지 변경 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file || null); // 이미지 파일 설정
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* 전체 컨테이너 크기 고정 */}
      {/* 헤더 영역 */}
      <Header>
        <h2>마이 페이지</h2>
      </Header>
      <ProfileWrapper>
        <label htmlFor="profile-upload">
          <UserImage>
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : "https://via.placeholder.com/150"
              }
              alt="프로필 이미지"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </UserImage>
        </label>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {/* Icon added below the image */}
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
          onChange={handleImageChange} // 이미지 변경 핸들러 연결
        />
      </ProfileWrapper>

      {/* 정보 변경 폼 */}
      <EditForm onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <InputWrapper>
          <Label>이메일</Label>
          <InputField
            type="text"
            value="reactgreen@example.com" // 이메일은 고정값
            readOnly
          />
        </InputWrapper>

        {/* 아이디 */}
        <InputWrapper>
          <Label>아이디</Label>
          <InputField
            type="text"
            value="testID123" // 아이디는 고정값
            readOnly
          />
        </InputWrapper>

        {/* 닉네임 */}
        <InputWrapper>
          <Label>닉네임</Label>
          <InputField
            placeholder="닉네임을 입력해주세요."
            {...register("nickname")}
          />
          <ButtonGroup>
            <SubmitButton type="button">중복 확인</SubmitButton>
          </ButtonGroup>
        </InputWrapper>
        {errors.nickname && (
          <p style={{ color: "red", margin: "0 auto", textAlign: "center" }}>
            {errors.nickname.message}
          </p>
        )}

        {/* 저장 버튼 */}
        <SubmitButton type="submit">정보 변경 저장하기</SubmitButton>
      </EditForm>
    </div>
  );
}

export default MyPageEdit;
