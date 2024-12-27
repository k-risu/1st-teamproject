import { UserProfile } from "./MyPage.styled";
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

// 유효성 검증 스키마 정의
const schema = yup.object().shape({
  nickname: yup.string().required("닉네임을 입력해주세요."),
  password: yup
    .string()
    .required("비밀번호를 확인 부탁드립니다.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호는 동일하지 않습니다."),
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
  const onSubmit = (data) => {
    console.log({ ...data, profilePic }); // 최종 데이터 출력
    alert("정보가 저장되었습니다.");
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

        {/* 비밀번호 */}
        <InputWrapper>
          <Label>비밀번호</Label>
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password")}
          />
        </InputWrapper>
        {errors.password && (
          <p style={{ color: "red", margin: "0 auto", textAlign: "center" }}>
            {errors.password.message}
          </p>
        )}

        {/* 비밀번호 확인 */}
        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <InputField
            type="password"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm")}
          />
        </InputWrapper>
        {errors.passwordConfirm && (
          <p style={{ color: "red", margin: "0 auto", textAlign: "center" }}>
            {errors.passwordConfirm.message}
          </p>
        )}

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
