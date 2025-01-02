import axios from "axios";
import { useEffect, useState } from "react";
import { ModalLayout } from "./HoverModal.styles";
import styled from "@emotion/styled";

const HoverModal = ({ modalXY }) => {
  const ModalLayout = styled.div`
    width: 200px;
    height: 100px;
    background-color: whitesmoke;
    position: fixed;
    border: 1px solid black;
    border-radius: 3px;
    left: ${(props) => `${props.modalXY.x}px`};
    top: ${(props) => `${props.modalXY.y}px`};

    z-index: 99;
  `;

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <ModalLayout>
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
      </ModalLayout>
    </>
  );
};
export default HoverModal;
