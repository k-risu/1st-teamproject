import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import SigninForm from "./SigninForm";
import SigninID from "./SigninID";
import SigninPw from "./SigninPw";
import {
  SigninContainer,
  SigninBox,
  ButtonGroup,
  SigninBoxGroupbt,
  SigninTitle,
} from "./SignIn.styled";

function SignIn() {
  // 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showPwPopup, setShowPwPopup] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(""); // 추가된 부분
  const [isVerified, setIsVerified] = useState(false);
  const [associatedID, setAssociatedID] = useState("");
  // 모든 상태와 핸들러를 여기에 유지합니다.
  // 로그인 Formik 설정
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("올바른 이메일 형식이 아닙니다.")
        .required("이메일을 입력해주세요."),
      password: yup.string().required("비밀번호를 입력해주세요."),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.code === "OK") {
          alert("로그인 성공!");
          setLoginError("");
        } else {
          setLoginError("로그인 실패. 이메일 또는 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error("로그인 오류:", error);
        setLoginError("서버 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // 이메일 Formik 설정
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("올바른 이메일 형식이 아닙니다.")
        .required("이메일을 입력해주세요."),
    }),
    onSubmit: async () => {
      try {
        // GET 요청으로 인증번호 전송
        await handleVerifyCode("GET");
        setVerificationSent(true); // 인증번호 전송 상태 업데이트
      } catch (error) {
        console.error("인증번호 전송 오류:", error);
      }
    },
  });

  // 비밀번호 찾기 Formik 설정
  const pwFormik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요."),
    }),
    onSubmit: (values) => {
      console.log("제출된 비밀번호:", values);
      alert("비밀번호가 성공적으로 재설정되었습니다.");
      setShowPwPopup(false); // 팝업 닫기
    },
  });

  // 인증번호 확인 및 전송 통합 함수
  const handleVerifyCode = async (method = "GET") => {
    try {
      const url =
        method === "GET"
          ? `/api/mail?email=${emailFormik.values.email}`
          : "/api/mail";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body:
          method === "POST"
            ? JSON.stringify({
                email: emailFormik.values.email,
                code: verificationCode,
              })
            : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.code === "OK") {
        alert(method === "POST" ? "인증 성공!" : "인증번호 전송 성공!");
        setIsVerified(method === "POST");
        if (method === "GET") {
          setVerificationSent(true);
        }
        if (method === "POST" && result.userId) {
          setAssociatedID(result.userId);
        }
      } else {
        alert("인증 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("인증 오류:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <SigninContainer>
      <SigninBox>
        {/* 헤더 */}
        <div style={{ position: "relative" }}>
          <SigninTitle>로 그 인</SigninTitle>
        </div>

        {/* 로그인 Form */}
        <SigninForm
          loginFormik={loginFormik} // loginFormik 전달
          isLoading={isLoading}
          loginError={loginError}
        />
        {/* 버튼 그룹 */}
        <ButtonGroup>
          <SigninBoxGroupbt onClick={() => setShowEmailPopup(true)}>
            아이디 찾기
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={() => setShowPwPopup(true)}>
            비밀번호 찾기
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={() => (window.location.href = "/signup")}>
            회원가입
          </SigninBoxGroupbt>
        </ButtonGroup>
      </SigninBox>

      {/* 아이디 찾기 팝업 */}
      {/* 필요한 Props 전달 */}
      {showEmailPopup && (
        <SigninID
          setShowEmailPopup={setShowEmailPopup}
          handleVerifyCode={handleVerifyCode}
          verificationSent={verificationSent}
          setVerificationCode={setVerificationCode}
          isVerified={isVerified}
          associatedID={associatedID}
          emailFormik={emailFormik} // emailFormik 전달
        />
      )}

      {/* 비밀번호 찾기 팝업 */}
      {showPwPopup && (
        <SigninPw
          pwFormik={pwFormik}
          emailFormik={emailFormik}
          setShowPwPopup={setShowPwPopup}
          verificationSent={verificationSent}
          handleVerifyCode={handleVerifyCode}
          isVerified={isVerified}
          setVerificationCode={setVerificationCode}
        />
      )}
    </SigninContainer>
  );
}

export default SignIn;
