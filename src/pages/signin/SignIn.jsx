import { useState } from "react";
import { GoX } from "react-icons/go"; // 닫기 버튼 아이콘 추가
import { SlArrowLeft } from "react-icons/sl";

import { useFormik } from "formik"; // 이메일 양식 확인 npm 적용
import * as yup from "yup";
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
  const [isLoginFailed, setIsLoginFailed] = useState(false); // 로그인 실패 상태
  const [loginError, setLoginError] = useState(""); // 로그인 오류 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [isEmailMode, setIsEmailMode] = useState(false); // 이메일 찾기 모드
  const [labelText, setLabelText] = useState("이메일"); // 이메일 라벨 텍스트
  const [showVerificationCode, setShowVerificationCode] = useState(false); // 인증 코드 UI 표시 상태
  const [verificationSent, setVerificationSent] = useState(false); // 인증번호 전송 상태

  // 이메일 유효성 검사 스키마
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("이메일을 입력해주세요."),
  });

  // Formik을 활용한 폼 상태 관리
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://192.168.0.180:8080/api/mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });
        const data = await response.json();
        if (data.code === "OK") {
          alert("인증번호가 전송되었습니다.");
          setVerificationSent(true); // 버튼 상태 변경
        } else {
          alert("인증번호 전송 실패. 다시 시도해주세요.");
        }
      } catch (error) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });

  const handleVerificationSubmit = async () => {
    const email = formik.values.email;
    const code = document.querySelector("input[name='verificationCode']").value;
    try {
      const response = await fetch("http://192.168.0.180:8080/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (data.code === "OK") {
        alert("인증 성공!");
        handleClosePopup(); // 팝업 닫기
      } else {
        alert("인증 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  // 로그인 및 아이디 찾기 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true); // 로딩 상태 시작
    try {
      const response = await fetch(
        "http://192.168.0.180:8080/api/user/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();

      if (data.code === "IE") {
        setLoginError("이메일이 잘못되었습니다.");
      } else if (data.code === "IP") {
        setLoginError("비밀번호가 잘못되었습니다.");
      } else {
        alert("로그인 성공!");
        setIsLoginFailed(false);
        setLoginError("");
        // 성공 시 추가 작업 (ex: 토큰 저장, 페이지 이동)
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setLoginError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  // 이메일 찾기 버튼 클릭 핸들러
  const handleFindEmail = () => {
    setIsEmailMode(true); // 이메일 찾기 모드 활성화
    setLabelText("닉네임"); // 이메일 라벨을 닉네임으로 변경
  };

  // 로그인 하기 버튼 클릭 핸들러 (이메일 찾기 모드에서)
  const handleLoginMode = () => {
    setIsEmailMode(false); // 이메일 찾기 모드 비활성화
    setLabelText("이메일"); // 라벨 텍스트를 이메일로 변경
  };

  // 비밀번호 찾기 버튼 클릭 핸들러
  const handleFindPassword = () => {
    setShowPopup(true); // 팝업 표시
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 숨김
  };

  return (
    <SigninContainer>
      <SigninBox>
        {/* 헤더 영역: 이전 버튼과 제목 */}
        <div style={{ position: "relative" }}>
          <PrevButton>
            <SlArrowLeft />
          </PrevButton>
          {/* 화면 중앙 정렬된 제목 */}
          <SigninTitle>로 그 인</SigninTitle>
        </div>

        {/* 로그인 및 아이디 찾기 폼 */}
        <Form onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <SigninMailBox>
            <SigninLabel>{labelText}</SigninLabel>
            {/* 라벨 텍스트 상태 기반 변경 */}
            <SigninBoxInputBox
              type="text"
              placeholder={`${labelText}을 입력해주세요.`}
              name="email"
            />
          </SigninMailBox>

          {/* 비밀번호 필드 항상 표시 */}
          <SigninPwBox>
            <SigninLabel>비밀번호</SigninLabel>
            <SigninBoxInputBox
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="password"
            />
          </SigninPwBox>

          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <SigninBoxSigninbt type="submit" disabled={isLoading}>
            {isLoading
              ? "로그인 중..."
              : isEmailMode
                ? "아이디 찾기"
                : "로그인 하기"}
            {/* 상태 기반 텍스트 변경 */}
          </SigninBoxSigninbt>
        </Form>

        {/* 버튼 그룹 */}
        <ButtonGroup>
          <SigninBoxGroupbt
            onClick={isEmailMode ? handleLoginMode : handleFindEmail}
          >
            {isEmailMode ? "로그인 하기" : "이메일 찾기"}
            {/* 상태에 따라 텍스트 변경 */}
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={handleFindPassword}>
            비밀번호 찾기
          </SigninBoxGroupbt>
          {/* 회원가입bt 누르면 /signup 으로 이동 추가 */}
          <SigninBoxGroupbt onClick={() => (window.location.href = "/signup")}>
            회원가입
          </SigninBoxGroupbt>
        </ButtonGroup>
      </SigninBox>
      {/* 비밀번호 찾기 팝업 부분 수정 */}

      {showPopup && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClosePopup}>
              <GoX />
            </CloseButton>
            <h2 style={{ textAlign: "center" }}>비밀번호를 잊으셨나요?</h2>
            <PopupForm onSubmit={formik.handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <SigninBoxInputBox
                  type="text"
                  name="email"
                  placeholder="이메일 주소를 입력해주세요."
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                />
                {formik.touched.email && formik.errors.email && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.email}
                  </p>
                )}
                <ResetButton type="submit">
                  {verificationSent ? "인증번호 전송" : "비밀번호 재설정"}
                </ResetButton>
              </div>
            </PopupForm>

            {showVerificationCode && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <SigninBoxInputBox
                  type="text"
                  name="verificationCode"
                  placeholder="인증번호를 입력해주세요."
                  required
                  style={{ marginTop: "10px" }}
                />
                <button
                  onClick={async () => {
                    const email = document.querySelector(
                      "input[name='email']",
                    ).value;
                    try {
                      const response = await fetch(
                        "http://192.168.0.180:8080/api/mail",
                        {
                          // fetch("/api/mail", 이 부분에 새 엔드포인트 입력 적용
                          method: "GET", // HTTP 메서드
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }), // 요청 데이터
                        },
                      );
                      const data = await response.json();
                      if (data.code === "OK") {
                        alert("인증번호가 전송되었습니다.");
                      } else {
                        alert("인증번호 전송 실패. 다시 시도해주세요.");
                      }
                    } catch (error) {
                      alert(
                        "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
                      );
                    }
                  }}
                >
                  인증번호 전송
                </button>

                <ResetButton
                  onClick={() => {
                    const code = document.querySelector(
                      "input[name='verificationCode']",
                    ).value;
                    alert(`입력한 인증번호: ${code}`); // 인증번호 확인 알림
                    handleClosePopup(); // 팝업 닫기
                  }}
                >
                  인증번호 확인
                </ResetButton>
              </div>
            )}
          </PopupContainer>
        </PopupOverlay>
      )}
    </SigninContainer>
  );
}

export default SignIn;
