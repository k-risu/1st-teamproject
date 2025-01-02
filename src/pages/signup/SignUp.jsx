import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import MailModal from "./MailModal";
import {
  AlreadyMemberBt,
  BackBt,
  DuplicateCheckBt,
  ErrorsMsg,
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

// 유효성 검사 스키마
const loginSchema = yup.object({
  nickname: yup.string().required("닉네임은 필수 입니다."),
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue, // setValue 사용
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // 회원가입 폼 제출 처리 함수
  const handleSubmitForm = async (data) => {
    const isValid = await trigger(); // trigger()로 모든 필드 검사

    if (!isValid) {
      // 유효성 검사 실패 시, 회원가입 처리를 하지 않음
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
      // navigate("/signin");
      // 회원가입 후 처리 (로그인 페이지로 이동 등)
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  // 이메일 인증 버튼 클릭 시
  const handleEmailVerification = async () => {
    const isEmailValid = await trigger("email");
    if (isEmailValid) {
      try {
        const email = getValues("email");
        const response = await axios.get(
          `/api/mail?email=${encodeURIComponent(email)}`,
        );

        if (response.status === 200) {
          console.log("성공 : ", response.data);
          setIsModalOpen(true); // 인증 성공 시 모달 열기
          setIsEmailVerified(true);
          setValue("emailVerified", true); // 이메일 인증 상태를 true로 설정
        } else {
          console.log("인증 요청 실패");
        }
      } catch (error) {
        console.error("인증 요청 중 오류 발생:", error);
      }
    } else {
      console.log("이메일이 유효하지 않습니다.");
    }
  };

  // 인증 성공 시 이메일 인증 완료 상태로 변경
  const handleVerificationSuccess = () => {
    setIsEmailVerified(true);
    setValue("emailVerified", true); // 인증 성공 시 emailVerified 상태 변경
  };

  // Over14 체크박스를 클릭하면 오류 메시지가 사라짐
  const handleOver14Change = (e) => {
    const isChecked = e.target.checked;
    setOver14(isChecked); // Over14 상태 변경
    setValue("Over14", isChecked); // react-hook-form에 값 설정
    trigger("Over14"); // validation을 다시 실행하여 오류 메시지 업데이트
  };

  return (
    <SignUpLayout>
      <SignUpForm onSubmit={handleSubmit(handleSubmitForm)}>
        <SignUpTop>
          <BackBt>
            <SlArrowLeft />
          </BackBt>
          <SignUpText>회원가입</SignUpText>
        </SignUpTop>

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
          </SignUpFieldDCBT>

          <SignUpFieldDCBT>
            <SignUpField CheckBt={true}>
              <SignUpTextFieldName>&nbsp;아이디</SignUpTextFieldName>
              <SignUpTextField
                {...register("nickname")}
                placeholder="사용하실 아이디를 입력해주세요"
              />
              <MgsWrap>
                <ErrorsMsg>{errors.nickname?.message}</ErrorsMsg>
              </MgsWrap>
            </SignUpField>
            <DuplicateCheckBt type="button">중복확인</DuplicateCheckBt>
          </SignUpFieldDCBT>

          <SignUpField>
            <SignUpTextFieldName>비밀번호</SignUpTextFieldName>
            <SignUpTextField
              type="password" // 비밀번호 숨기기
              {...register("password")} // password 등록
              placeholder="사용 하실 비밀번호를 입력해주세요"
            />
            <MgsWrap>
              <ErrorsMsg>{errors.password?.message}</ErrorsMsg>
            </MgsWrap>
          </SignUpField>

          <SignUpField>
            <SignUpTextFieldName>비밀번호 확인</SignUpTextFieldName>
            <SignUpTextField
              type="password" // 비밀번호 확인 숨기기
              {...register("passwordConfirm")} // passwordConfirm 등록
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <MgsWrap>
              <ErrorsMsg>{errors.passwordConfirm?.message}</ErrorsMsg>
            </MgsWrap>
          </SignUpField>
        </SignUpFieldWrap>

        {/* 처음부터 표시되는 '14세 이상' 오류 메시지 */}
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
        {/* 오류 메시지는 Over14 체크박스가 체크되지 않았을 때만 표시 */}
        {errors.Over14 && (
          <ErrorsMsg over14={true}>{errors.Over14?.message}</ErrorsMsg>
        )}

        <SignUpBtWrap>
          <Link to="/signin">
            <AlreadyMemberBt>이미 회원이세요?</AlreadyMemberBt>
          </Link>
          <SignUpBt type="submit">회원가입하기</SignUpBt>
        </SignUpBtWrap>

        {/* 이메일 인증 메시지 표시 */}
        {!isEmailVerified && (
          <ErrorsMsg email={true}>이메일 인증이 필요합니다.</ErrorsMsg>
        )}
      </SignUpForm>

      {/* 이메일 인증 모달 */}
      <MailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerificationSuccess={handleVerificationSuccess}
        email={getValues("email")}
      />
    </SignUpLayout>
  );
}

export default SignUp;
