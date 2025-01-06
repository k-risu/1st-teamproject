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
import Swal from "sweetalert2";

function SigninID({
  emailFormik,
  verificationSent,
  verificationCode,
  setVerificationCode,
  handleVerifyCode,
  isVerified,
  setShowEmailPopup,
}) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(180); // 3분 타이머 초기화
  const [isVerifying, setIsVerifying] = useState(false); // 인증 상태
  const [userId, setUserId] = useState(""); // 추가된 userId 상태

  // 상태 초기화 함수
  const resetState = () => {
    setVerificationCode(""); // 인증번호 초기화
    setSeconds(180); // 타이머 초기화
    setUserId(""); // 사용자 ID 초기화
  };

  // 팝업 닫기 핸들러
  const closePopup = () => {
    resetState(); // 상태 초기화
    setShowEmailPopup(false); // 팝업 닫기
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

  // 인증 성공 후 userId 가져오기
  useEffect(() => {
    if (isVerified) {
      const fetchUserId = async () => {
        try {
          const response = await fetch(
            `/api/user/find-id?email=${emailFormik.values.email}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            },
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          console.log("userId API 응답:", result);
          if (result.code === "OK") {
            setUserId(result.userId); // userId 상태 저장
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "warning",
              title: "유저 ID를 가져오는 데 실패했습니다.",
            });
          }
        } catch (error) {
          console.error("유저 ID 가져오기 오류:", error);
        }
      };

      fetchUserId();
    }
  }, [isVerified, emailFormik.values.email]);

  const handleSendVerification = () => {
    if (!emailFormik.values.email) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "이메일을 입력해주세요.",
      });
      return;
    }
    setIsVerifying(true);
    handleVerifyCode("GET");
    setTimeout(() => {
      setIsVerifying(false);
    }, 1000); // 모의 딜레이
  };

  const handleVerifyCodeSubmission = async () => {
    console.log("인증번호 확인 버튼 클릭됨");
    console.log("현재 인증번호:", verificationCode);

    if (!verificationCode) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "인증번호를 입력해주세요.",
      });
      return;
    }

    console.log("인증번호 유효성 통과, POST 요청 진행");
    await handleVerifyCode("POST");
    setVerificationCode(""); // 인증 코드 초기화
    console.log("인증번호 초기화 완료");
  };

  return (
    <PopupOverlay onClick={closePopup}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closePopup}>
          <GoX />
        </CloseButton>
        <h2 style={{ textAlign: "center" }}>아이디 찾기</h2>

        <PopupForm
          onSubmit={(e) => {
            e.preventDefault();
            emailFormik.handleSubmit();
          }}
        >
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
                onClick={handleSendVerification}
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
                      value={verificationCode} // verificationCode 상태를 바인딩
                      onChange={(e) => {
                        console.log("입력된 인증번호:", e.target.value); // 디버깅용 로그 추가
                        setVerificationCode(e.target.value); // 상태 업데이트
                      }}
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

                  <ResetButton
                    type="button"
                    onClick={handleVerifyCodeSubmission}
                    disabled={isVerifying}
                  >
                    {isVerifying ? "확인 중..." : "인증 확인"}
                  </ResetButton>
                </>
              )}

              {isVerified && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <p style={{ color: "green" }}>인증 성공!</p>
                  {userId && (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <p>사용자 ID: {userId}</p>
                      <button
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText(userId); // userId 복사
                            const Toast = Swal.mixin({
                              toast: true,
                              position: "center",
                              showConfirmButton: false,
                              timer: 1000,
                              timerProgressBar: true,
                              didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                              },
                            });
                            Toast.fire({
                              icon: "success",
                              title: "ID가 복사되었습니다.",
                            });
                            closePopup(); // 상태 초기화 및 팝업 닫기
                            navigate("/signin"); // "/signin" 페이지로 이동
                          } catch (error) {
                            console.error("ID 복사 오류:", error);
                            const Toast = Swal.mixin({
                              toast: true,
                              position: "center",
                              showConfirmButton: false,
                              timer: 1000,
                              timerProgressBar: true,
                              didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                              },
                            });
                            Toast.fire({
                              icon: "warning",
                              title: "ID 복사 중 오류가 발생했습니다.",
                            });
                          }
                        }}
                        style={{
                          margin: "10px 10px",
                          padding: "10px 10px",
                          backgroundColor: "#f4f4f4",
                          color: "black",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        ID 복사
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </PopupForm>
      </PopupContainer>
    </PopupOverlay>
  );
}

export default SigninID;
