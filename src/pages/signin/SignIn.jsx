import { useState } from "react";
import { GoX } from "react-icons/go"; // 닫기 버튼 아이콘 추가
import { SlArrowLeft } from "react-icons/sl";

import { useFormik } from "formik"; // Formik으로 폼 상태 관리
import * as yup from "yup"; // yup으로 유효성 검사
import {
  ButtonGroup,
  CloseButton,
  Form,
  PopupContainer,
  PopupForm,
  PopupOverlay,
  PrevButton,
  ResetButton,
  SigninBox,
  SigninBoxGroupbt,
  SigninBoxInputBox,
  SigninBoxSigninbt,
  SigninContainer,
  SigninLabel,
  SigninMailBox,
  SigninPwBox,
  SigninTitle,
} from "./SignIn.styled";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [loginError, setLoginError] = useState(""); // 로그인 오류 메시지
  const [showEmailPopup, setShowEmailPopup] = useState(false); // 이메일 찾기 팝업 상태
  const [showPwPopup, setShowPwPopup] = useState(false); // 비밀번호 찾기 팝업 상태
  const [verificationSent, setVerificationSent] = useState(false); // 인증번호 전송 상태
  const [verificationCode, setVerificationCode] = useState(""); // 입력된 인증번호

  // 로그인 유효성 검사 스키마
  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("이메일을 입력해주세요."),
    password: yup.string().required("비밀번호를 입력해주세요."),
  });

  // Formik 설정
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.code === "IE") {
          setLoginError("이메일이 잘못되었습니다.");
        } else if (data.code === "IP") {
          setLoginError("비밀번호가 잘못되었습니다.");
        } else if (data.code === "OK") {
          alert("로그인 성공!");
          setLoginError("");
        }
      } catch (error) {
        setLoginError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // 이메일 유효성 검사 스키마
  const emailValidationSchema = yup.object({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("이메일을 입력해주세요."),
  });

  // 비밀번호 찾기 유효성 검사 스키마
  const pwValidationSchema = yup.object({
    password: yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 입력해주세요."),
  });

  // 이메일 Formik
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/mail?email=${values.email}`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.code === "OK") {
          alert("인증번호가 전송되었습니다.");
          setVerificationSent(true);
        } else {
          alert("인증번호 전송 실패. 다시 시도해주세요.");
        }
      } catch (error) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });

  // 비밀번호 Formik
  const pwFormik = useFormik({
    initialValues: { password: "", passwordConfirm: "" },
    validationSchema: pwValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/user/find-pw", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userNo: 12345, // 예시 userNo
            email: emailFormik.values.email,
            ...values,
          }),
        });
        const data = await response.json();
        if (data.code === "OK") {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          setShowPwPopup(false);
        } else if (data.code === "PFE") {
          alert("비밀번호 형식이 잘못되었습니다.");
        } else if (data.code === "PCE") {
          alert("비밀번호 확인이 일치하지 않습니다.");
        }
      } catch (error) {
        alert("서버 오류가 발생했습니다.");
      }
    },
  });

  // 인증번호 확인 핸들러
  const handleVerifyCode = async () => {
    try {
      const response = await fetch(
        `/api/mail?email=${emailFormik.values.email}&code=${verificationCode}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (data.code === "OK") {
        alert("인증 완료!");
      } else {
        alert("인증번호를 확인해주세요.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <SigninContainer>
      <SigninBox>
        {/* 헤더 */}
        <div style={{ position: "relative" }}>
          <PrevButton>
            <SlArrowLeft />
          </PrevButton>
          <SigninTitle>로 그 인</SigninTitle>
        </div>

        {/* 로그인 폼 */}
        <Form onSubmit={loginFormik.handleSubmit}>
          <SigninMailBox>
            <SigninLabel>이메일</SigninLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SigninBoxInputBox
                type="text"
                name="email"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                placeholder="이메일을 입력해주세요."
                style={{
                  width: "400px", // 입력 필드 너비를 꽉 차게 설정
                  padding: "12px", // 내부 여백 조정
                  fontSize: "16px", // 텍스트 크기 조정
                }}
              />
              {/* 스키마의 required 메시지 표시 */}
              {loginFormik.touched.email && loginFormik.errors.email && (
                <p
                  style={{ color: "red", marginTop: "5px", textAlign: "left" }}
                >
                  {loginFormik.errors.email}
                </p>
              )}
            </div>
          </SigninMailBox>

          <SigninPwBox>
            <SigninLabel>비밀번호</SigninLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SigninBoxInputBox
                type="password"
                name="password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                placeholder="비밀번호를 입력해주세요."
                style={{
                  width: "400px", // 입력 필드 너비를 꽉 차게 설정
                  padding: "12px", // 내부 여백 조정
                  fontSize: "16px", // 텍스트 크기 조정
                }}
              />
              {/* 스키마의 required 메시지 표시 */}
              {loginFormik.touched.password && loginFormik.errors.password && (
                <p
                  style={{ color: "red", marginTop: "5px", textAlign: "left" }}
                >
                  {loginFormik.errors.password}
                </p>
              )}
            </div>
          </SigninPwBox>
          {loginError && (
            <p
              style={{
                color: "red",
                margin: "10px 0",
                textAlign: "center", // 로그인 에러 메시지도 중간 정렬
              }}
            >
              {loginError}
            </p>
          )}
          <SigninBoxSigninbt type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인 하기1"}
          </SigninBoxSigninbt>
        </Form>

        {/* 버튼 그룹 */}
        <ButtonGroup>
          <SigninBoxGroupbt onClick={() => setShowEmailPopup(true)}>
            이메일 찾기1
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={() => setShowPwPopup(true)}>
            비밀번호 찾기
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={() => (window.location.href = "/signup")}>
            회원가입
          </SigninBoxGroupbt>
        </ButtonGroup>
      </SigninBox>

      {/* 이메일 찾기 팝업 */}
      {showEmailPopup && (
        <PopupOverlay onClick={() => setShowEmailPopup(false)}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowEmailPopup(false)}>
              <GoX />
            </CloseButton>
            <h2 style={{ textAlign: "center" }}>이메일 찾기</h2>
            <PopupForm onSubmit={emailFormik.handleSubmit}>
              <SigninBoxInputBox
                type="text"
                name="email"
                placeholder="이메일 주소를 입력해주세요."
                value={emailFormik.values.email}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
              />
              {emailFormik.touched.email && emailFormik.errors.email && (
                <p style={{ color: "red" }}>{emailFormik.errors.email}</p>
              )}
              <ResetButton type="submit">
                {verificationSent ? "인증번호 전송 완료" : "인증번호 전송"}
              </ResetButton>
              {verificationSent && (
                <>
                  <SigninBoxInputBox
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <ResetButton type="button" onClick={handleVerifyCode}>
                    인증 확인
                  </ResetButton>
                </>
              )}
            </PopupForm>
          </PopupContainer>
        </PopupOverlay>
      )}

      {/* 비밀번호 찾기 팝업 */}
      {showPwPopup && (
        <PopupOverlay onClick={() => setShowPwPopup(false)}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowPwPopup(false)}>
              <GoX />
            </CloseButton>
            <h2 style={{ textAlign: "center" }}>비밀번호 찾기</h2>
            <PopupForm onSubmit={pwFormik.handleSubmit}>
              <SigninBoxInputBox
                type="password"
                name="password"
                placeholder="새 비밀번호를 입력해주세요."
                value={pwFormik.values.password}
                onChange={pwFormik.handleChange}
                onBlur={pwFormik.handleBlur}
              />
              {pwFormik.touched.password && pwFormik.errors.password && (
                <p style={{ color: "red" }}>{pwFormik.errors.password}</p>
              )}
              <SigninBoxInputBox
                type="password"
                name="passwordConfirm"
                placeholder="새 비밀번호를 다시 입력해주세요."
                value={pwFormik.values.passwordConfirm}
                onChange={pwFormik.handleChange}
                onBlur={pwFormik.handleBlur}
              />
              {pwFormik.touched.passwordConfirm &&
                pwFormik.errors.passwordConfirm && (
                  <p style={{ color: "red" }}>
                    {pwFormik.errors.passwordConfirm}
                  </p>
                )}
              <ResetButton type="submit">비밀번호 재설정</ResetButton>
            </PopupForm>
          </PopupContainer>
        </PopupOverlay>
      )}
    </SigninContainer>
  );
}

export default SignIn;
