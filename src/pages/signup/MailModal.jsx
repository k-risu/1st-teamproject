import { useEffect, useState } from "react";
import axios from "axios";
import {
  CloseButton,
  ModalContent,
  ModalInput,
  ModalOverlay,
  TimerText,
  VerifyButton,
  InputAndTimerWrapper,
} from "./MailModal.styles";

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

  // 모달이 열릴 때마다 타이머 리셋
  useEffect(() => {
    if (isOpen) {
      setSeconds(180); // 타이머를 3분으로 리셋
      setVerificationCode(""); // 인증번호 초기화
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
      // 서버에 이메일과 인증번호를 전송
      const response = await axios.post("/api/mail", {
        email: email,
        code: verificationCode,
      });

      if (response.status === 200) {
        console.log("이메일 인증 성공:", response.data);
        setIsEmailVerified(true);
        onVerificationSuccess(); // 인증 성공 처리
        onClose(); // 모달 닫기
      } else {
        console.log("이메일 인증 실패:", response.data);
      }
    } catch (error) {
      console.error(
        "인증 요청 중 오류 발생:",
        error.response?.data || error.message,
      );
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
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <p>
            인증 메일을 발송했습니다. 메일을 확인하고 인증번호를 입력해주세요.
          </p>
          <InputAndTimerWrapper>
            <ModalInput
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호를 입력하세요"
            />
            <TimerText>
              {Math.floor(seconds / 60)}:{seconds % 60}
            </TimerText>
          </InputAndTimerWrapper>
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
