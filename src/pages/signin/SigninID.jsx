import {
  PopupContainer,
  PopupForm,
  PopupOverlay,
  CloseButton,
  ResetButton,
  SigninBoxInputBox,
} from "./SignIn.styled";
import { GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

function SigninID({
  emailFormik,
  verificationSent,
  verificationCode,
  setVerificationCode,
  handleVerifyCode,
  isVerified,
  associatedID,
  setShowEmailPopup,
}) {
  const navigate = useNavigate(); // navigate 선언

  return (
    <PopupOverlay onClick={() => setShowEmailPopup(false)}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setShowEmailPopup(false)}>
          <GoX />
        </CloseButton>
        <h2 style={{ textAlign: "center" }}>아이디 찾기</h2>
        {/* 이메일 입력 폼 */}
        <PopupForm
          onSubmit={(e) => {
            e.preventDefault(); // 기본 동작 방지
            emailFormik.handleSubmit(); // Formik의 제출 로직 호출
          }}
        >
          {!verificationSent && (
            <>
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
              <ResetButton type="submit">인증번호 전송</ResetButton>
            </>
          )}

          {/* 인증번호 확인 섹션 */}
          {verificationSent && (
            <>
              <SigninBoxInputBox
                type="text"
                placeholder="인증번호를 입력해주세요."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <ResetButton
                type="button"
                onClick={() => {
                  if (!verificationCode) {
                    alert("인증번호를 입력해주세요.");
                    return;
                  }
                  console.log("제출된 인증 코드:", verificationCode);
                  handleVerifyCode("POST");
                }}
              >
                인증 확인
              </ResetButton>

              {/* 인증 성공 시 표시 */}
              {isVerified && (
                <>
                  <p style={{ color: "green", marginTop: "10px" }}>
                    인증 성공!
                  </p>
                  {associatedID && (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <p>사용자 ID: {associatedID}</p>
                      <button
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText(associatedID);
                            alert("ID가 복사되었습니다.");
                            navigate("/signin"); // "SignIn" 화면으로 이동
                          } catch (error) {
                            console.error("ID 복사 오류:", error);
                            alert("ID 복사 중 오류가 발생했습니다.");
                          }
                        }}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        ID 복사
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </PopupForm>
      </PopupContainer>
    </PopupOverlay>
  );
}

export default SigninID;
