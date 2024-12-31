import { useEffect, useState } from "react";
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
  setShowPwPopup,
  emailFormik,
  verificationSent,
  handleVerifyCode,
  isVerified,
}) {
  const navigate = useNavigate(); // navigation 추가
  const [seconds, setSeconds] = useState(180); // 3분 타이머 초기화
  const [isVerifying, setIsVerifying] = useState(false); // 인증 상태
  const [verificationError, setVerificationError] = useState(""); // 인증 오류 메시지
  const [verificationCode, setVerificationCode] = useState(""); // 로컬 verificationCode 상태

  // 상태 초기화 함수
  const resetState = () => {
    setVerificationCode(""); // 인증번호 초기화
    setSeconds(180); // 타이머 초기화
    setVerificationError(""); // 오류 메시지 초기화
  };

  // 팝업 닫기 핸들러
  const closePopup = () => {
    resetState(); // 상태 초기화
    setShowPwPopup(false); // 팝업 닫기
  };

  // 모달이 열릴 때마다 타이머 초기화
  useEffect(() => {
    if (verificationSent) {
      setSeconds(180);
    }
  }, [verificationSent]);

  // 타이머 동작
  useEffect(() => {
    if (!verificationSent || seconds === 0 || isVerified) return; // isVerified가 true면 타이머 정지
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [verificationSent, seconds, isVerified]);

  const handleVerifyCodeSubmission = async (e) => {
    e.preventDefault();
    console.log("인증번호 확인 버튼 클릭됨");

    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    console.log("인증번호 유효성 통과, POST 요청 진행");
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
        navigate("/signin-repw", {
          state: { email: emailFormik.values.email }, // 이메일 전달 // 비밀번호 재설정 페이지로 이동
        });
      } else {
        setVerificationError("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <PopupOverlay onClick={closePopup}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closePopup}>
          <GoX />
        </CloseButton>
        <h2 style={{ textAlign: "center" }}>비밀번호를 잊으셨나요?</h2>

        <PopupForm onSubmit={handleVerifyCodeSubmission}>
          {!verificationSent ? (
            <>
              {/* 이메일 입력 */}
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
              <ResetButton
                type="button"
                onClick={() => handleVerifyCode("GET")}
                disabled={isVerifying}
              >
                {isVerifying ? "전송 중..." : "인증번호 전송"}
              </ResetButton>
            </>
          ) : (
            <>
              {!isVerified && (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* 인증번호 입력 */}
                    <SigninBoxInputBox
                      type="text"
                      placeholder="인증번호를 입력해주세요."
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <p
                      style={{
                        marginLeft: "10px",
                        color: seconds === 0 ? "red" : "black",
                      }}
                    >
                      {Math.floor(seconds / 60)}:
                      {String(seconds % 60).padStart(2, "0")}
                    </p>
                  </div>

                  <ResetButton type="submit" disabled={isVerifying}>
                    {isVerifying ? "확인 중..." : "인증 확인"}
                  </ResetButton>
                </>
              )}

              {isVerified && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <p style={{ color: "green" }}>인증 성공!</p>
                </div>
              )}

              {verificationError && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {verificationError}
                </p>
              )}
            </>
          )}
        </PopupForm>
      </PopupContainer>
    </PopupOverlay>
  );
}

export default SigninPw;
