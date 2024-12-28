import {
  Form,
  SigninBoxInputBox,
  SigninLabel,
  SigninMailBox,
  SigninPwBox,
  SigninBoxSigninbt,
} from "./SignIn.styled";

function SigninForm({ loginFormik, isLoading, loginError }) {
  if (!loginFormik) {
    console.error("loginFormik is undefined!");
    return <p>Error: 로그인 폼 데이터가 없습니다.</p>;
  }

  return (
    <Form onSubmit={loginFormik.handleSubmit}>
      {/* 아이디 입력 */}
      <SigninMailBox>
        <SigninLabel>아이디</SigninLabel>
        <SigninBoxInputBox
          type="text"
          name="userId" // userId로 변경
          value={loginFormik.values.userId}
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          placeholder="아이디를 입력해주세요."
          style={{
            width: "400px",
            padding: "12px",
            fontSize: "16px",
          }}
        />
        {loginFormik.touched.userId && loginFormik.errors.userId && (
          <p style={{ color: "red" }}>{loginFormik.errors.userId}</p>
        )}
      </SigninMailBox>

      {/* 비밀번호 입력 */}
      <SigninPwBox>
        <SigninLabel>비밀번호</SigninLabel>
        <SigninBoxInputBox
          type="password"
          name="password"
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          placeholder="비밀번호를 입력해주세요."
          style={{
            width: "400px",
            padding: "12px",
            fontSize: "16px",
          }}
        />
        {loginFormik.touched.password && loginFormik.errors.password && (
          <p style={{ color: "red", marginTop: "5px", textAlign: "left" }}>
            {loginFormik.errors.password}
          </p>
        )}
      </SigninPwBox>

      {loginError && (
        <p
          style={{
            color: "red",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          {loginError}
        </p>
      )}
      <SigninBoxSigninbt type="submit" disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인 하기"}
      </SigninBoxSigninbt>
    </Form>
  );
}

export default SigninForm;
