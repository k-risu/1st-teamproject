import { useEffect, useState } from "react";
import axios from "axios";
import {
  CloseButton,
  ModalContent,
  ModalInput,
  ModalOverlay,
  TimerText,
  VerifyButton,
  InputAndTimerWrapper, // 새로 추가된 Wrapper
} from "./MailModal.styles";

const MailModal = ({ isOpen, onClose, onVerificationSuccess, email }) => {
  const [seconds, setSeconds] = useState(180); // 타이머 초기값 3분
  const [isVerifying, setIsVerifying] = useState(false); // 인증 중 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태 추가

  // 모달이 열릴 때마다 타이머 리셋 (중간에 취소된 경우에도 처음부터 시작)
  useEffect(() => {
    if (isOpen) {
      setSeconds(180); // 타이머를 3분으로 리셋
      setVerificationCode(""); // 인증번호 초기화
    }
  }, [isOpen]); // 모달이 열릴 때마다 리셋

  // 타이머 동작
  useEffect(() => {
    if (!isOpen || seconds === 0) return;
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
  }, [isOpen, seconds]);

  const handleSendVerificationEmail = () => {
    setIsVerifying(true);
    // 이메일 인증 메일 발송 API 호출

    setTimeout(() => {
      setIsVerifying(false); // 발송 완료 후 상태 변경
      onVerificationSuccess(); // 인증 완료 상태
      onClose(); // 모달 닫기
    }, 10);
  };

  const handleVerifyEmail = async () => {
    try {
      // 서버에 이메일과 인증번호를 전송
      const response = await axios.post("/api/mail", {
        email: email, // 이미 전달된 이메일
        code: verificationCode, // 사용자 입력 인증번호
      });

      if (response.status === 200) {
        console.log("이메일 인증 성공:", response.data);
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

  // 모달 외부를 클릭했을 때 닫기
  const handleOverlayClick = (e) => {
    // `ModalContent` 내부에서 클릭된 경우에는 모달을 닫지 않도록 이벤트 전파를 막는다
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <p>
            인증 메일을 발송합니다. 메일을 확인하고 인증번호를 입력해주세요.
          </p>
          <InputAndTimerWrapper>
            {/* ModalInput에서 인증번호 입력 받기 */}
            <ModalInput
              type="text"
              value={verificationCode} // 인증번호 상태를 연결
              onChange={(e) => setVerificationCode(e.target.value)} // 인증번호 값 업데이트
              placeholder="인증번호를 입력하세요"
            />
            <TimerText>
              {Math.floor(seconds / 60)}:{seconds % 60}
            </TimerText>
          </InputAndTimerWrapper>
          <VerifyButton
            onClick={handleVerifyEmail} // 인증번호 확인 버튼 클릭 시 이메일 인증 요청
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
