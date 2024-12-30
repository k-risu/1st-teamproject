import { ResetButton, SigninBoxInputBox } from "./SignIn.styled";
import { useFormik } from "formik";
import * as yup from "yup";

function SigninRepw() {
  const pwFormik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요."),
    }),
    onSubmit: async (values) => {
      console.log("비밀번호 재설정:", values);
      alert("비밀번호가 성공적으로 재설정되었습니다.");
      // 성공 후 로직 추가 (예: 로그인 페이지로 이동)
    },
  });

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>비밀번호 재설정</h2>
      <form onSubmit={pwFormik.handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">비밀번호</label>
          <SigninBoxInputBox
            id="password"
            type="password"
            name="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            value={pwFormik.values.password}
            onChange={pwFormik.handleChange}
            onBlur={pwFormik.handleBlur}
          />
          {pwFormik.touched.password && pwFormik.errors.password && (
            <p style={{ color: "red" }}>{pwFormik.errors.password}</p>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="passwordConfirm">비밀번호 재확인</label>
          <SigninBoxInputBox
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="새로운 비밀번호를 다시 입력해주세요."
            value={pwFormik.values.passwordConfirm}
            onChange={pwFormik.handleChange}
            onBlur={pwFormik.handleBlur}
          />
          {pwFormik.touched.passwordConfirm &&
            pwFormik.errors.passwordConfirm && (
              <p style={{ color: "red" }}>{pwFormik.errors.passwordConfirm}</p>
            )}
        </div>
        <ResetButton type="submit">비밀번호 재설정</ResetButton>
      </form>
    </div>
  );
}

export default SigninRepw;
