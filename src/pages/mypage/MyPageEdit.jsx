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
} from "./MyPageEdit.styled";
import { useState } from "react";

function MyPageEdit() {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150",
  ); // 기본 프로필 이미지

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div>
      {/* 헤더 영역 */}
      <Header>
        <h2>마이 페이지</h2>
      </Header>
      <ProfileWrapper>
        <UserProfile>
          <label htmlFor="profile-upload">
            <UserImage>
              <img
                src={profileImage}
                alt="프로필 이미지"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </UserImage>
          </label>
          <p style={{ cursor: "pointer" }}>프로필 이미지 변경</p>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </UserProfile>
      </ProfileWrapper>
      {/* 정보 변경 폼 */}
      <EditForm>
        {/* 이메일 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>이메일</Label>
          <InputField
            type="text"
            value="reactgreen@example.com" // 이메일은 고정값
            readOnly
          />
        </div>
        {/* 비밀번호 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>비밀번호</Label>
          <InputField type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        {/* 비밀번호 확인 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>비밀번호 확인</Label>
          <InputField type="password" placeholder="비밀번호 확인" />
        </div>
        {/* 닉네임 */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Label>닉네임</Label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <InputField placeholder="닉네임을 입력해주세요" />
            <ButtonGroup>
              <SubmitButton>중복 확인</SubmitButton>
            </ButtonGroup>
          </div>
        </div>
        {/* 저장 버튼 */}
        <SubmitButton>정보 변경 저장하기</SubmitButton>
      </EditForm>
    </div>
  );
}

export default MyPageEdit;
