import axios from "axios";
import { useState } from "react";

const HoverModal = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const getMemberPics = async () => {
    const projectNo = 2;
    try {
      const res = axios.get(`api/main/{projectNo}?projectNo=${projectNo}`);
      console.log(res);
      setImageUrls(res.memberPic);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <span>프로젝트 이름의 구성원</span>
        <div>
          {imageUrls.map((item, index) => (
            <div key={index}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${item}`}
                alt="구성원 프로필 이미지"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HoverModal;
