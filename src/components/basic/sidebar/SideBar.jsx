import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BiBarChartSquare,
  BiCalendar,
  BiHomeAlt,
  BiLogOut,
  BiUserCircle,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  SideBarContainer,
  SideBarMenu,
  SideBarMenuWrap,
  SideBarProfile,
  SideBarProfileImg,
} from "./SideBar.styles";

const SideBar = () => {
  const [userData, setUserData] = useState({});
  const [cookies, removeCookie] = useCookies("signedUserNo");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `api/user?targetUserNo=${cookies.signedUserNo}&signedUserNo=${cookies.signedUserNo}&page=my`,
      );
      setUserData({ ...res.data });
    };
    getUserData();
  }, []);

  const removeCookieHandler = () => {
    removeCookie("signedUserNo");
    navigate("/signin");
  };

  return (
    <>
      <SideBarContainer className="SideBarContainer">
        <SideBarProfile>
          <SideBarProfileImg
            src={
              userData.pic === null
                ? "public/profile8.jpg"
                : `${import.meta.env.VITE_BASE_URL}/pic/user/${cookies.signedUserNo}/${userData.pic}`
            }
            alt="profileImage"
          />
          <span>
            {userData.nickname?.substring(0, userData.nickname?.indexOf("#"))}
          </span>
        </SideBarProfile>
        <SideBarMenuWrap>
          <SideBarMenu>
            <BiHomeAlt style={{ fontSize: 35 }} />
            <p>홈</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiCalendar style={{ fontSize: 35 }} />
            <p>일정</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiBarChartSquare style={{ fontSize: 35 }} />
            <p>프로젝트</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiUserCircle style={{ fontSize: 35 }} />
            <p>마이페이지</p>
          </SideBarMenu>
          <SideBarMenu onClick={(e) => removeCookieHandler(e)}>
            <BiLogOut style={{ fontSize: 35 }} />
            <p>로그아웃</p>
          </SideBarMenu>
        </SideBarMenuWrap>
      </SideBarContainer>
    </>
  );
};
export default SideBar;
