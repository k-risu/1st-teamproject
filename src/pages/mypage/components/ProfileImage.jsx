import { TbCameraHeart } from "react-icons/tb";
import { useMemo, useId } from "react";
import { UserImage } from "../MyPageEdit.styled";

function ProfileImage({ pic, targetUserNo, handleImageChange }) {
  const uniqueId = useId();
  const inputId = `profile-upload-${uniqueId}`;

  // const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";
  const DEFAULT_PROFILE_IMAGE = "/default_profile.jpg";

  const profileImageSrc = useMemo(() => {
    if (pic instanceof File) return URL.createObjectURL(pic);
    if (targetUserNo && pic) {
      return `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo}/${pic}`;
    } else {
      return DEFAULT_PROFILE_IMAGE;
    }
  }, [pic, targetUserNo]);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <label htmlFor={inputId}>
        {/* UserImage 스타일 적용 */}
        <UserImage src={profileImageSrc} alt="프로필 이미지" />
      </label>
      <TbCameraHeart
        style={{
          fontSize: "24px",
          cursor: "pointer",
          position: "absolute",
          bottom: "5px", // 이미지 아래쪽에서 간격
          right: "5px", // 이미지 오른쪽에서 간격
          color: "rgba(0, 0, 0, 0.6)", // 약간 투명한 색상 (선택 사항)
          backgroundColor: "white", // 배경색 추가 (선택 사항)
          borderRadius: "50%", // 둥근 배경
          padding: "5px", // 배경 내부 여백
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // 그림자 추가 (선택 사항)
        }}
        onClick={() => document.getElementById(inputId).click()}
      />
      <input
        id={inputId}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange} // 이 부분에서 handleImageChange를 사용하도록 추가
      />
    </div>
  );
}

export default ProfileImage;
