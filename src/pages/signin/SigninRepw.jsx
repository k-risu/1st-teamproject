import { useFormik } from "formik";
import * as yup from "yup";
import {
  ErrorMessage,
  InputWrapper,
  LabelInputWrapper,
  RepwInputBox,
  RepwLabel,
  RepwTitle,
  ResetButton,
  SigninRepwContainer,
} from "./SignInRepw.styled";
import { useNavigate, useLocation } from "react-router-dom";

function SigninRepw() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달된 이메일 정보 추출
  const email = location.state?.email || "";

  const pwFormik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("새 비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요."),
    }),
    onSubmit: async (values) => {
      // Formik values를 출력하여 확인
      console.log("Formik values:", values);

      try {
        // API 요청 데이터를 출력하여 확인
        console.log("API 요청 데이터:", {
          email: email, // 전달된 이메일 사용
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });

        // 비밀번호 변경 요청
        const response = await fetch("/api/user/find-pw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // 전달된 이메일 사용
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }),
        });

        const result = await response.json();

        if (response.ok && result.code === "OK") {
          alert(
            "비밀번호가 성공적으로 재설정되었습니다. 로그인 페이지로 이동합니다.",
          );
          navigate("/signin");
        } else if (result.code === "PFE") {
          alert("비밀번호 형식 오류. 다시 시도해주세요.");
        } else if (result.code === "PCE") {
          alert("비밀번호 확인 오류. 다시 시도해주세요.");
        } else {
          console.error("알 수 없는 오류 발생:", result);
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });

  return (
    <SigninRepwContainer>
      <RepwTitle>비밀번호 재설정</RepwTitle>
      <form onSubmit={pwFormik.handleSubmit}>
        <InputWrapper>
          <LabelInputWrapper>
            <RepwLabel htmlFor="password">새 비밀번호</RepwLabel>
            <RepwInputBox
              id="password"
              type="password"
              name="password"
              placeholder="새로운 비밀번호를 입력해주세요."
              value={pwFormik.values.password}
              onChange={pwFormik.handleChange}
              onBlur={pwFormik.handleBlur}
            />
          </LabelInputWrapper>
          {pwFormik.touched.password && pwFormik.errors.password && (
            <ErrorMessage>{pwFormik.errors.password}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <LabelInputWrapper>
            <RepwLabel htmlFor="passwordConfirm">비밀번호 재확인</RepwLabel>
            <RepwInputBox
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="새로운 비밀번호를 다시 입력해주세요."
              value={pwFormik.values.passwordConfirm}
              onChange={pwFormik.handleChange}
              onBlur={pwFormik.handleBlur}
            />
          </LabelInputWrapper>
          {pwFormik.touched.passwordConfirm &&
            pwFormik.errors.passwordConfirm && (
              <ErrorMessage>{pwFormik.errors.passwordConfirm}</ErrorMessage>
            )}
        </InputWrapper>
        <ResetButton type="submit">비밀번호 재설정</ResetButton>
      </form>
    </SigninRepwContainer>
  );
}

export default SigninRepw;
