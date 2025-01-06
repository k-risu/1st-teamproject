import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import MailModal from "./MailModal";
import {
  AlreadyMemberBt,
  ArrowLeft,
  BackBt,
  DuplicateCheckBt,
  EmailErrorsMsg,
  ErrorsMsg,
  MgsOver14Wrap,
  MgsWrap,
  Over14CheckBox,
  Over14Label,
  SignUpBt,
  SignUpBtWrap,
  SignUpField,
  SignUpFieldDCBT,
  SignUpFieldWrap,
  SignUpForm,
  SignUpLayout,
  SignUpText,
  SignUpTextField,
  SignUpTextFieldName,
  SignUpTop,
} from "./SignUp.styles";

// 유효성 검사 스키마 (로그인 및 회원가입 폼에서 사용하는 모든 입력값에 대한 유효성 검사 규칙)
const loginSchema = yup.object({
  nickname: yup
    .string()
    .required("아이디는 필수 입니다.")
    .test("is-valid-id", "아이디 형식이 올바르지 않습니다.", (value) =>
      /^[a-zA-Z0-9_-]+$/.test(value),
    ), // userId 검증 추가,
  email: yup
    .string()
    .email("유효한 이메일을 입력하세요.")
    .required("이메일은 필수 입니다."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자리입니다.")
    .max(16, "비밀번호는 최대 16자리까지 입력 가능합니다.")
    .matches(
      /[A-Za-z]/,
      "비밀번호에는 최소 하나 이상의 영문자가 포함되어야 합니다.",
    )
    .matches(/\d/, "비밀번호에는 최소 하나 이상의 숫자가 포함되어야 합니다.")
    .matches(
      /[\W_]/,
      "비밀번호에는 최소 하나 이상의 특수문자가 포함되어야 합니다.",
    )
    .required("비밀번호는 필수 입니다."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수 입니다."),
  Over14: yup.boolean().oneOf([true], "14세 이상이어야 합니다."),
  emailVerified: yup.boolean().oneOf([true], "이메일 인증이 필요합니다."),
});

function SignUp() {
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [over14, setOver14] = useState(false); // Over14 상태를 직접 관리
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 아이디 중복 확인 여부
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState(""); // 중복 확인 메시지 상태
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger,
    getValues,
    setValue, // setValue 사용
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  /**
   * 회원가입 폼 제출 처리 함수
   * @param {object} data - 회원가입 폼에서 입력된 데이터
   */
  const handleSubmitForm = useCallback(
    async (data) => {
      const isValid = await trigger(); // trigger()로 모든 필드 검사

      if (!isValid || !isNicknameChecked) {
        if (!isNicknameChecked) {
          setError("nickname", {
            type: "manual",
            message: "아이디 중복 확인이 필요합니다.",
          });
        }
        return;
      }
      try {
        const formData = new FormData();
        formData.append(
          "req",
          JSON.stringify({
            email: data.email,
            userId: data.nickname,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
          }),
        );

        const response = await axios.post("/api/user/sign-up", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*",
          },
        });

        if (response.data.code === "DPE") {
          console.error("회원가입 실패: 중복 이메일");

          // 중복 이메일 오류를 email 필드에 설정
          setError("email", {
            type: "manual",
            message: "이미 가입된 이메일입니다.",
          });
          return;
        }
        console.log("회원가입 성공:", response.data);

        if (response.data.code === "OK") {
          navigate("/signin");
        }
      } catch (error) {
        console.error("회원가입 실패:", error);
      }
    },
    [isNicknameChecked, navigate, setError, trigger], // 의존성 배열에 필요한 값들 추가
  );

  /**
   * 이메일 인증 버튼 클릭 시 인증을 요청하고 모달을 열기 위한 함수
   */
  const handleEmailVerification = async () => {
    const isEmailValid = await trigger("email");

    if (isEmailValid) {
      setIsModalOpen(true); // 모달 먼저 열기
      setIsEmailVerified(false); // 초기화
      try {
        const email = getValues("email");
        const response = await axios.get(
          `/api/mail?email=${encodeURIComponent(email)}`,
        );

        if (response.status === 200) {
          console.log("인증 요청 성공:", response.data);
        } else {
          console.log("인증 요청 실패");
        }
      } catch (error) {
        console.error("인증 요청 중 오류 발생:", error);
      }
    } else {
      console.log("유효하지 않은 이메일입니다.");
    }
  };

  /**
   * 인증 성공 시 이메일 인증 완료 상태로 변경
   */
  const handleVerificationSuccess = () => {
    setValue("emailVerified", true); // react-hook-form에 상태 전달
    setIsModalOpen(false); // 모달 닫기
  };

  /**
   * Over14 체크박스를 클릭하면 오류 메시지가 사라짐
   * @param {Event} e - 체크박스 이벤트
   */
  const handleOver14Change = (e) => {
    const isChecked = e.target.checked;
    setOver14(isChecked); // Over14 상태 변경
    setValue("Over14", isChecked); // react-hook-form에 값 설정
    trigger("Over14"); // validation을 다시 실행하여 오류 메시지 업데이트
  };

  /**
   * 아이디 중복 체크를 위한 함수
   */
  const handleIdCheck = async () => {
    const nickname = getValues("nickname");

    const isIdValid = await trigger("nickname");
    if (!isIdValid) {
      return;
    }

    try {
      // GET 요청에서 쿼리 문자열로 데이터 전달
      const response = await axios.get(
        `/api/user/sign-up?userId=${encodeURIComponent(nickname)}`,
        {
          headers: {
            accept: "*/*", // 서버가 기대하는 Accept 헤더 설정
          },
        },
      );

      if (response.data.code === "DPI") {
        setError("nickname", {
          type: "manual",
          message: "중복된 아이디입니다.",
        });
        setNicknameCheckMessage("");
        setIsNicknameChecked(false);
      } else if (response.data.code === "OK") {
        setNicknameCheckMessage("사용 가능한 아이디입니다.");
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("중복 확인 요청 중 오류 발생:", error);
      setError("nickname", {
        type: "manual",
        message: "중복 확인 요청에 실패했습니다.",
      });
    }
  };

  /**
   * 아이디 입력 시 중복 확인 메시지를 초기화
   * @param {Event} e - 아이디 입력 이벤트
   */
  const handleNicknameChange = (e) => {
    setIsNicknameChecked(false);
    setValue("nickname", e.target.value);
    setNicknameCheckMessage("");
    trigger("nickname"); // 유효성 검사 강제 실행
  };

  return (
    <SignUpLayout>
      <SignUpForm onSubmit={handleSubmit(handleSubmitForm)}>
        {/* 회원가입 폼 레이아웃 및 UI */}
        <SignUpTop>
          <BackBt>
            <ArrowLeft onClick={() => navigate(-1)} />
          </BackBt>
          <SignUpText>회원가입</SignUpText>
        </SignUpTop>

        {/* 이메일 입력 및 인증 */}
        <SignUpFieldWrap>
          <SignUpFieldDCBT>
            <SignUpField CheckBt={true}>
              <SignUpTextFieldName>&nbsp;이메일</SignUpTextFieldName>
              <SignUpTextField
                {...register("email")}
                placeholder="사용 하실 이메일 주소를 입력해주세요"
              />
              <MgsWrap>
                <ErrorsMsg>{errors.email?.message}</ErrorsMsg>
              </MgsWrap>
            </SignUpField>

            <DuplicateCheckBt
              type="button"
              onClick={handleEmailVerification}
              disabled={isEmailVerified}
            >
              {isEmailVerified ? "인증완료" : "이메일 인증"}
            </DuplicateCheckBt>
            <EmailErrorsMsg>
              {isSubmitted && !isEmailVerified && (
                <ErrorsMsg>이메일 인증이 필요합니다.</ErrorsMsg>
              )}
            </EmailErrorsMsg>
          </SignUpFieldDCBT>

          {/* 아이디 입력 및 중복 확인 */}
          <SignUpFieldDCBT>
            <SignUpField CheckBt={true}>
              <SignUpTextFieldName>&nbsp;아이디</SignUpTextFieldName>
              <SignUpTextField
                {...register("nickname")}
                onChange={handleNicknameChange}
                placeholder="사용하실 아이디를 입력해주세요"
              />
              <MgsWrap>
                <ErrorsMsg>{errors.nickname?.message}</ErrorsMsg>
                {nicknameCheckMessage && (
                  <ErrorsMsg nicknameCheckMessage={nicknameCheckMessage}>
                    {nicknameCheckMessage}
                  </ErrorsMsg>
                )}
              </MgsWrap>
            </SignUpField>
            <DuplicateCheckBt type="button" onClick={handleIdCheck}>
              중복확인
            </DuplicateCheckBt>
          </SignUpFieldDCBT>

          {/* 비밀번호 입력 및 확인 */}
          <SignUpField>
            <SignUpTextFieldName>비밀번호</SignUpTextFieldName>
            <SignUpTextField
              type="password"
              {...register("password")}
              placeholder="사용 하실 비밀번호를 입력해주세요"
            />
            <MgsWrap>
              <ErrorsMsg>{errors.password?.message}</ErrorsMsg>
            </MgsWrap>
          </SignUpField>

          <SignUpField>
            <SignUpTextFieldName>비밀번호 확인</SignUpTextFieldName>
            <SignUpTextField
              type="password"
              {...register("passwordConfirm")}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <MgsWrap>
              <ErrorsMsg>{errors.passwordConfirm?.message}</ErrorsMsg>
            </MgsWrap>
          </SignUpField>
        </SignUpFieldWrap>

        {/* 14세 이상 체크박스 */}
        <Over14Label>
          <Over14CheckBox
            type="checkbox"
            {...register("Over14")}
            checked={over14} // 상태값에 따라 체크 여부 설정
            onChange={handleOver14Change} // 상태 변경 시 호출
          />
          &nbsp;필수
          <div>&nbsp;&nbsp;14세 이상입니다.</div>
        </Over14Label>
        <MgsOver14Wrap>
          {errors.Over14 && (
            <ErrorsMsg over14={true}>{errors.Over14?.message}</ErrorsMsg>
          )}
        </MgsOver14Wrap>

        {/* 회원가입 버튼 */}
        <SignUpBtWrap>
          <Link to="/signin">
            <AlreadyMemberBt>이미 회원이세요?</AlreadyMemberBt>
          </Link>
          <SignUpBt type="submit">회원가입하기</SignUpBt>
        </SignUpBtWrap>
      </SignUpForm>

      {/* 이메일 인증 모달 */}
      <MailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerificationSuccess={handleVerificationSuccess}
        email={getValues("email")}
        setIsEmailVerified={setIsEmailVerified}
      />
    </SignUpLayout>
  );
}

export default SignUp;
