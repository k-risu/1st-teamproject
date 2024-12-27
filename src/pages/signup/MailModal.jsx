import React, { useEffect, useState } from "react";
import {
  CloseButton,
  ModalContent,
  ModalInput,
  ModalOverlay,
  TimerText,
  VerifyButton,
  InputAndTimerWrapper, // 새로 추가된 Wrapper
} from "./MailModal.styles";

const MailModal = ({ isOpen, onClose, onVerificationSuccess }) => {
  const [seconds, setSeconds] = useState(180); // 타이머 초기값 3분
  const [isVerifying, setIsVerifying] = useState(false); // 인증 중 상태

  // 모달이 열릴 때마다 타이머 리셋 (중간에 취소된 경우에도 처음부터 시작)
  useEffect(() => {
    if (isOpen) {
      setSeconds(180); // 타이머를 3분으로 리셋
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
    // 이메일 인증 메일 발송 API 호출 (실제 API 구현 필요)
    setTimeout(() => {
      setIsVerifying(false); // 발송 완료 후 상태 변경
      onVerificationSuccess(); // 인증 완료 상태
      onClose(); // 모달 닫기
    }, 2000);
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
          <p>인증 메일을 발송합니다. 메일을 확인하고 인증해주세요.</p>
          <InputAndTimerWrapper>
            <ModalInput />
            <TimerText>
              {Math.floor(seconds / 60)}:{seconds % 60}
            </TimerText>
          </InputAndTimerWrapper>
          <VerifyButton
            onClick={handleSendVerificationEmail}
            disabled={isVerifying}
          >
            {isVerifying ? "인증 확인중..." : "인증 확인"}
          </VerifyButton>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default MailModal;
