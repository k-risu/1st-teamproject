import { useState } from "react";
import { GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  PopupContainer,
  PopupForm,
  PopupOverlay,
  ResetButton,
  SigninBoxInputBox,
} from "./SignIn.styled";

function SigninPw({
  pwFormik,
  setShowPwPopup,
  emailFormik,
  verificationSent,
  handleVerifyCode,
  isVerified,
  setVerificationCode,
}) {
  const [verificationError, setVerificationError] = useState("");
  const navigate = useNavigate(); // navigation 추가

  // if (!emailFormik || !pwFormik) {
  //   return <p>Loading...</p>; // Formik 객체가 없을 때 안전한 렌더링
  // }

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    if (!verificationSent) {
      try {
        const response = await fetch(
          `/api/mail?email=${emailFormik.values.email}`,
          {
            method: "GET",
          },
        );
        const result = await response.json();
        if (result.code === "OK") {
          alert("인증번호가 전송되었습니다.");
        } else {
          alert("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("인증번호 전송 오류:", error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else {
      try {
        const response = await fetch("/api/mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailFormik.values.email,
            code: verificationCode,
          }),
        });
        const result = await response.json();
        if (result.code === "OK") {
          alert("인증 성공!");
          navigate("/src/pages/signin/SigninPw.jsx");
        } else {
          setVerificationError("인증번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("인증 확인 오류:", error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <PopupOverlay onClick={() => setShowPwPopup(false)}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setShowPwPopup(false)}>
          <GoX />
        </CloseButton>

        <h2 style={{ textAlign: "center" }}>비밀번호를 잊으셨나요?</h2>

        <PopupForm onSubmit={handleEmailVerification}>
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
              <ResetButton type="button" onClick={handleEmailVerification}>
                인증 확인
              </ResetButton>
              {verificationError && (
                <p style={{ color: "red" }}>{verificationError}</p>
              )}
              {isVerified && (
                <>
                  <p style={{ color: "green", marginTop: "10px" }}>
                    인증 성공!
                  </p>
                </>
              )}
            </>
          )}
        </PopupForm>
      </PopupContainer>
    </PopupOverlay>
  );
}

export default SigninPw;
