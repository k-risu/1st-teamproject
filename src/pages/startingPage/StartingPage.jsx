// 메인영역 출력부 입니다

import { Link } from "react-router-dom";
import { Auth, LoginBt, LogoImg, SignUpBt } from "./StartingPage.styles";

function StartingPage() {
  return (
    <>
      <Auth>
        <LogoImg />
        <Link to={`/signup`}>
          <SignUpBt>회원가입</SignUpBt>
        </Link>
        <Link to={`/signin`}>
          <LoginBt>로그인</LoginBt>
        </Link>
      </Auth>
    </>
  );
}
export default StartingPage;
