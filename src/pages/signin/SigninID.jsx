import {
  PopupContainer,
  PopupForm,
  PopupOverlay,
  CloseButton,
  ResetButton,
  SigninBoxInputBox,
} from "./SignIn.styled";
import { GoX } from "react-icons/go";

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
  return (
    <PopupOverlay onClick={() => setShowEmailPopup(false)}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setShowEmailPopup(false)}>
          <GoX />
        </CloseButton>
        <h2 style={{ textAlign: "center" }}>아이디 찾기</h2>
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
            {verificationSent
              ? "인증번호를 확인 후 입력해주세요."
              : "인증번호 전송"}
          </ResetButton>
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
                onClick={() => handleVerifyCode("POST")}
              >
                인증 확인
              </ResetButton>
              {isVerified && (
                <>
                  <p style={{ color: "green", marginTop: "10px" }}>
                    인증 성공!
                  </p>
                  {associatedID && (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <p>사용자 ID: {associatedID}</p>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(associatedID)
                        }
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
