import { useEffect, useRef, useState } from "react";

const MailTimer = ({ onTimerEnd, resetTimer, setResetTimer }) => {
  const timerRef = useRef(null); // 타이머를 제어하는 ref
  const [seconds, setSeconds] = useState(180); // 초기 값은 3분 (180초)

  // 타이머 시작 및 관리
  useEffect(() => {
    if (resetTimer) {
      setSeconds(180); // 타이머 리셋
      if (timerRef.current) {
        clearInterval(timerRef.current); // 기존 타이머 클리어
      }
    }

    // 타이머 시작 (새로운 타이머 설정)
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // 타이머 클린업 (컴포넌트가 unmount 될 때, 혹은 타이머 종료 시)
    return () => clearInterval(timerRef.current);
  }, [resetTimer]); // resetTimer 값이 변경될 때마다 실행

  // 타이머 종료 시 콜백 호출
  useEffect(() => {
    if (seconds === 0) {
      onTimerEnd(); // 타이머 종료 시 콜백 실행
      clearInterval(timerRef.current); // 타이머 종료
    }
  }, [seconds, onTimerEnd]); // seconds 값이 변경될 때만 실행

  // resetTimer가 true로 설정된 후 false로 되돌리는 로직
  useEffect(() => {
    if (resetTimer) {
      // 타이머 리셋 후 resetTimer를 false로 변경
      setResetTimer(false);
    }
  }, [resetTimer, setResetTimer]);

  return (
    <div>
      <span>
        남은 시간: {Math.floor(seconds / 60)}:{seconds % 60}{" "}
      </span>
    </div>
  );
};

export default MailTimer;
