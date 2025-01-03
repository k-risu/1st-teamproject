import { TbCameraHeart } from "react-icons/tb";
import { useMemo, useId } from "react";

function ProfileImage({ pic, targetUserNo, handleImageChange }) {
  const uniqueId = useId();
  const inputId = `profile-upload-${uniqueId}`;

  const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";

  const profileImageSrc = useMemo(() => {
    if (pic instanceof File) return URL.createObjectURL(pic);
    if (targetUserNo && pic)
      return `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo}/${pic}`;
    return DEFAULT_PROFILE_IMAGE;
  }, [pic, targetUserNo]);

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor={inputId}>
        <img
          src={profileImageSrc}
          alt="프로필 이미지"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </label>
      <div style={{ marginTop: "10px" }}>
        <TbCameraHeart
          style={{ fontSize: "24px", cursor: "pointer" }}
          onClick={() => document.getElementById(inputId).click()}
        />
      </div>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ProfileImage;
