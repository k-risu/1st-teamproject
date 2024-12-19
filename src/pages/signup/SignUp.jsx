import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlreadyMemberBt,
  BackBt,
  DuplicateCheckBt,
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

function SignUp() {
  const [over14, setOver14] = useState(null);
  const handleCheckBoxChange = () => {
    setOver14((prev) => !prev); // 체크 해제 또는 체크
  };
  return (
    <SignUpLayout>
      <SignUpForm>
        <SignUpTop>
          <BackBt>&lt;</BackBt>
          <SignUpText>회원가입</SignUpText>
        </SignUpTop>
        <SignUpFieldWrap>
          <SignUpField>
            <SignUpTextFieldName>&nbsp;이메일</SignUpTextFieldName>
            <SignUpTextField />
          </SignUpField>
          <SignUpField>
            <SignUpTextFieldName>회원가입</SignUpTextFieldName>
            <SignUpTextField />
          </SignUpField>
          <SignUpFieldDCBT>
            <SignUpField CheckBt={true}>
              <SignUpTextFieldName>&nbsp;닉네임</SignUpTextFieldName>
              <SignUpTextField />
            </SignUpField>
            <DuplicateCheckBt type="button">중복 확인</DuplicateCheckBt>
          </SignUpFieldDCBT>
        </SignUpFieldWrap>
        <Over14Label>
          <Over14CheckBox
            type="checkbox"
            checked={over14}
            onChange={handleCheckBoxChange}
          />
          &nbsp;필수
          <div>&nbsp;&nbsp;14세 이상입니다.</div>
        </Over14Label>
        <SignUpBtWrap>
          <Link to="/">
            <AlreadyMemberBt>이미 회원이세요?</AlreadyMemberBt>
          </Link>
          <SignUpBt type="submit">회원가입하기</SignUpBt>
        </SignUpBtWrap>
      </SignUpForm>
    </SignUpLayout>
  );
}
export default SignUp;
