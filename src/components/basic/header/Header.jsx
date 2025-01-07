import { HeaderButton, HeaderLogo, HeaderMenuWrap } from "./Header.styles";
import { BiAddToQueue, BiBulb, BiMessage } from "react-icons/bi";
import { HeaderContainer } from "./index.styled";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const [signedUserData, setSignedUserData] = useState({
    userNo: cookies.signedUserNo,
    nickname: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(`/api/user`, {
        params: {
          targetUserNo: cookies.signedUserNo,
          signedUserNo: cookies.signedUserNo,
        },
      });
      console.log(res);
      const signedNickname = res.data.nickname.split("#")[0];

      setSignedUserData({
        userNo: cookies.signedUserNo,
        nickname: signedNickname,
      });
    };
    getUserData();
  }, []);

  const createHandler = (e) => {
    navigate(`/project/create`, {
      state: { nickname: e.nickname, userNo: e.userNo },
    });
  };
  return (
    <>
      <HeaderContainer>
        {cookies.signedUserNo === "undefined" ? (
          <HeaderLogo
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="/logo100x100.png" alt="logo" />
          </HeaderLogo>
        ) : (
          <HeaderLogo
            onClick={() => {
              navigate("/schedule");
            }}
          >
            <img src="/logo100x100.png" alt="logo" />
          </HeaderLogo>
        )}
        {/* <BreadCrumb /> */}
        <HeaderMenuWrap>
          <HeaderButton onClick={() => createHandler(signedUserData)}>
            <BiAddToQueue style={{ fontSize: 30 }} />
          </HeaderButton>
          {/* <HeaderButton>
            <BiMessage style={{ fontSize: 30 }} />
          </HeaderButton>
          <HeaderButton>
            <BiBulb style={{ fontSize: 30 }} />
          </HeaderButton> */}
        </HeaderMenuWrap>
      </HeaderContainer>
    </>
  );
};
export default Header;
