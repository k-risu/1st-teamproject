import axios from "axios";
import { useEffect, useState } from "react";
import * as yup from "yup"; // yup 추가
import {
  CloseButton,
  InputAndTimerWrapper,
  ModalContent,
  ModalInput,
  ModalOverlay,
  TimerText,
  VerifyButton,
} from "./MailModal.styles";
import { ErrorsMsg } from "./SignUp.styles";

const MailModal = ({
  isOpen,
  onClose,
  onVerificationSuccess,
  email,
  setIsEmailVerified,
}) => {
  const [seconds, setSeconds] = useState(180); // 타이머 초기값 3분
  const [isVerifying, setIsVerifying] = useState(false); // 인증 중 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태 추가
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가

  // 모달이 열릴 때마다 타이머 리셋
  useEffect(() => {
    if (isOpen) {
      setSeconds(180); // 타이머를 3분으로 리셋
      setVerificationCode(""); // 인증번호 초기화
      setErrorMessage(""); // 오류 메시지 초기화
    }
  }, [isOpen]);

  // 타이머 동작
  useEffect(() => {
    if (!isOpen || seconds === 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, seconds]);

  const handleSendVerificationEmail = () => {
    setIsVerifying(true);
    // 이메일 인증 메일 발송 API 호출
    setTimeout(() => {
      setIsVerifying(false); // 발송 완료 후 상태 변경
    }, 10);
  };

  const handleVerifyEmail = async () => {
    try {
      // yup 검증 스키마 작성
      const schema = yup.object().shape({
        code: yup
          .string()
          .required("인증번호를 입력해주세요.")
          .matches(/^\d{4}$/, "정확한 4자리 인증번호를 입력해주세요."),
      });

      // yup 검증 실행
      await schema.validate({ code: verificationCode });

      // 서버에 이메일과 인증번호를 전송
      const response = await axios.post("/api/mail", {
        email: email,
        code: verificationCode,
      });

      if (response.status === 200 && response.data.code === "OK") {
        console.log("이메일 인증 성공:", response.data);
        setIsEmailVerified(true);
        onVerificationSuccess(); // 인증 성공 처리
        onClose(); // 모달 닫기
      } else {
        console.log("이메일 인증 실패:", response.data);
        setErrorMessage("인증번호가 올바르지 않습니다. 다시 시도해주세요."); // 인증 실패 메시지 설정
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        setErrorMessage(error.message); // yup 검증 오류 메시지 설정
      } else {
        console.error(
          "인증 요청 중 오류 발생:",
          error.response?.data || error.message,
        );
        setErrorMessage("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  // 모달 외부를 클릭했을 때 닫기 (인증 성공 처리 X)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // 단순히 모달만 닫음
    }
  };

  return (
    isOpen && (
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <p>
            인증 메일을 발송했습니다. 메일을 확인하고 인증번호를 입력해주세요.
          </p>
          <InputAndTimerWrapper>
            <ModalInput
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value);
                setErrorMessage(""); // 입력 시 오류 메시지 초기화
              }}
              placeholder="인증번호를 입력하세요"
            />
            <TimerText>
              {Math.floor(seconds / 60)}:{seconds % 60}
            </TimerText>
          </InputAndTimerWrapper>
          {errorMessage && <ErrorsMsg>{errorMessage}</ErrorsMsg>}
          <VerifyButton
            onClick={handleVerifyEmail}
            disabled={isVerifying || !verificationCode}
          >
            {isVerifying ? "인증 확인중..." : "인증 확인"}
          </VerifyButton>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default MailModal;
