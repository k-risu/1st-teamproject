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
import { SlArrowLeft } from "react-icons/sl";

function SignUp() {
  const [over14, setOver14] = useState(null);
  const handleCheckBoxChange = () => {
    setOver14((prev) => !prev); // 체크 해제 또는 체크
  };
  return (
    <SignUpLayout>
      <SignUpForm>
        <SignUpTop>
          <BackBt>
            <SlArrowLeft />
          </BackBt>
          <SignUpText>회원가입</SignUpText>
        </SignUpTop>
        <SignUpFieldWrap>
          <SignUpField>
            <SignUpTextFieldName>&nbsp;이메일</SignUpTextFieldName>
            <SignUpTextField placeholder="사용 하실 이메일 주소를 입력해주세요" />
          </SignUpField>
          <SignUpField>
            <SignUpTextFieldName>회원가입</SignUpTextFieldName>
            <SignUpTextField placeholder="사용 하실 비밀번호를 입력해주세요" />
          </SignUpField>
          <SignUpFieldDCBT>
            <SignUpField CheckBt={true}>
              <SignUpTextFieldName>&nbsp;닉네임</SignUpTextFieldName>
              <SignUpTextField placeholder="사용 하실 닉네임을 입력해주세요" />
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
