import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BiBarChartSquare,
  BiCalendar,
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
      const res = await axios.get(`/api/user`, {
        params: {
          targetUserNo: cookies.signedUserNo,
          signedUserNo: cookies.signedUserNo,
        },
      });
      console.log(res);

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
                ? "public/default_profile.jpg"
                : `${import.meta.env.VITE_BASE_URL}/pic/user/${cookies.signedUserNo}/${userData.pic}`
            }
            alt="profileImage"
          />
          <span>
            {userData.nickname?.substring(0, userData.nickname?.indexOf("#"))}
          </span>
        </SideBarProfile>
        <SideBarMenuWrap>
          <SideBarMenu onClick={() => navigate(`/schedule`)}>
            <BiCalendar style={{ fontSize: 35 }} />
            <p>Home</p>
          </SideBarMenu>
          <SideBarMenu onClick={() => navigate(`/project`)}>
            <BiBarChartSquare style={{ fontSize: 35 }} />
            <p>Project</p>
          </SideBarMenu>
          <SideBarMenu onClick={() => navigate(`/mypage`)}>
            <BiUserCircle style={{ fontSize: 35 }} />
            <p>MyPage</p>
          </SideBarMenu>
          <SideBarMenu onClick={(e) => removeCookieHandler(e)}>
            <BiLogOut style={{ fontSize: 35 }} />
            <p>LogOut</p>
          </SideBarMenu>
        </SideBarMenuWrap>
      </SideBarContainer>
    </>
  );
};
export default SideBar;
