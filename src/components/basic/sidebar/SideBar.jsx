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
  const [userProfile, setUserProfile] = useState(cookies.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`/api/user`, {
          params: {
            targetUserNo: parseInt(cookies.signedUserNo),
            signedUserNo: parseInt(cookies.signedUserNo),
          },
        });

        setUserData({ ...res.data });
        setUserProfile(userData.pic);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, [userProfile]);

  const linkMypageHandler = () => {
    navigate(`/mypage`, {
      state: {
        ...userData,
      },
    });
  };

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
                ? "/default_profile.jpg"
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
          <SideBarMenu onClick={() => linkMypageHandler(userData)}>
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
