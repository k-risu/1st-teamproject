// 메인영역 출력부 입니다

import { Link } from "react-router-dom";
import { Auth, LoginBt, LogoImg, SignUpBt } from "./StartingPage.styles";

function StartingPage() {
  return (
    <>
      <Auth>
        <LogoImg>
          <img src="/logo400x400.png" />
        </LogoImg>
        <Link to={`/signup`}>
          <SignUpBt>회원가입</SignUpBt>
        </Link>
        <Link to={`/signin`}>
          <LoginBt>로그인</LoginBt>
        </Link>
        <div>© 2025 Teamate. All rights reserved.</div>
      </Auth>
    </>
  );
}
export default StartingPage;
