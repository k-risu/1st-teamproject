import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";
import * as yup from "yup";
import MailTimer from "./MailTimer";
import axios from "axios";
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
import MailModal from "./MailModal";

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
    .required("비밀번호는 필수 입니다."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수 입니다."),
  Over14: yup.boolean().oneOf([true], "14세 이상이어야 합니다."),
});

function SignUp() {
  const [over14, setOver14] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // 회원가입 폼 제출 처리 함수
  const handleSubmitForm = async (data) => {
    try {
      const formData = new FormData();
      formData.append(
        "req",
        JSON.stringify({
          email: data.email,
          nickname: data.nickname,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        }),
      );
      formData.append("pic", "string"); // 실제 파일 첨부 시 파일 객체를 사용

      const response = await axios.post("/api/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
        },
      });

      console.log("회원가입 성공:", response.data);
      // 회원가입 후 처리 (로그인 페이지로 이동 등)
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  // 이메일 인증 버튼 클릭 시
  const handleEmailVerification = async () => {
    const isEmailValid = await trigger("email");

    if (isEmailValid) {
      setIsModalOpen(true); // 모달 열기
    } else {
      console.log("이메일이 유효하지 않습니다.");
    }
  };

  // 인증 성공 시 이메일 인증 완료 상태로 변경
  const handleVerificationSuccess = () => {
    setIsEmailVerified(true);
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

        <Over14Label>
          <Over14CheckBox
            type="checkbox"
            {...register("Over14")}
            checked={over14}
            onChange={() => setOver14((prev) => !prev)}
          />
          &nbsp;필수
          <div>&nbsp;&nbsp;14세 이상입니다.</div>
        </Over14Label>
        <ErrorsMsg over14={true}>{errors.Over14?.message}</ErrorsMsg>

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
      />
    </SignUpLayout>
  );
}

export default SignUp;
