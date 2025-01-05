import { HeaderButton, HeaderLogo, HeaderMenuWrap } from "./Header.styles";
import { BiAddToQueue, BiBulb, BiMessage } from "react-icons/bi";
import { HeaderContainer } from "./index.styled";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import { useCookies } from "react-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  return (
    <>
      <HeaderContainer>
        {cookies.signedUserNo === "undefined" ? (
          <HeaderLogo
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="public\logo-mock.png" alt="logo" />
          </HeaderLogo>
        ) : (
          <HeaderLogo
            onClick={() => {
              navigate("/schedule");
            }}
          >
            <img src="public\logo-mock.png" alt="logo" />
          </HeaderLogo>
        )}
        {/* <BreadCrumb /> */}
        <HeaderMenuWrap>
          <HeaderButton onClick={() => navigate(`/project/create`)}>
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
