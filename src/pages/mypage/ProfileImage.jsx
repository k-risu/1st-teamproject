import { TbCameraHeart } from "react-icons/tb";
import { useMemo } from "react";

function ProfileImage({
  pic,
  targetUserNo,
  handleImageChange,
  inputId = "profile-upload",
}) {
  const profileImageSrc = useMemo(() => {
    if (pic) return URL.createObjectURL(pic);
    if (targetUserNo)
      return `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo}/${pic}`;
    return "https://via.placeholder.com/150";
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
