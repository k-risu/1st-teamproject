import { HeaderButton, HeaderLogo, HeaderMenuWrap } from "./Header.styles";

const Header = () => {
  return (
    <>
      <HeaderLogo>
        <img src="public\logo-mock.png" alt="logo" />
      </HeaderLogo>
      <HeaderMenuWrap>
        <HeaderButton>추가</HeaderButton>
        <HeaderButton>메세지</HeaderButton>
        <HeaderButton>알림</HeaderButton>
      </HeaderMenuWrap>
    </>
  );
};
export default Header;
