import styled from "@emotion/styled";

const textFieldStyle = `
  border-radius: 20px;
  width: 650px;
  height: 65px;
  background-color: #f4f4f4;
`;
const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
// #f4f4f4

export const SignUpLayout = styled.div`
  display: flex;
  justify-content: center;

  max-width: 1920px;
  margin: 0 auto;
`;

export const SignUpForm = styled.form`
  display: flex;

  justify-content: center;
  flex-direction: column;

  margin: 0 auto;
  max-width: 100vw;
  /* height: 100vh; */
`;

export const SignUpTop = styled.div`
  position: relative;
  ${alignment}

  margin-top: 85px;
  margin-bottom: 100px;
`;

export const SignUpText = styled.h1`
  font-size: 30px;
`;
export const BackBt = styled.div`
  font-size: 30px;
  position: absolute;
  left: 1vw;
  top: 0;
`;

export const SignUpTextFieldName = styled.label`
  min-width: 100px;
  font-size: 25px;
  flex-shrink: 0;
  /* margin-right: 10px; */
`;
export const SignUpTextField = styled.input`
  ${textFieldStyle};
  margin-left: 5vw;
  box-sizing: border-box;
  justify-content: flex-start;
  font-size: 18px;
  text-align: left;
  padding-left: 15px;
  &::placeholder {
    font-size: 15px;
    color: #888888;
  }
`;
export const SignUpField = styled.div`
  ${alignment}
  margin-bottom: ${(props) =>
    props.CheckBt ? "0px" : "30px"}; /* 입력 필드 사이 여백 */
  width: 825px;
`;
export const SignUpFieldWrap = styled.div`
  position: relative;
`;
export const SignUpFieldDCBT = styled.div`
  ${alignment}
  height: 65px;
`;
export const DuplicateCheckBt = styled.button`
  /* position: absolute; */
  font-size: 15px;
  /* right: -100px; */
  /* bottom: 20px; */
  margin-left: 10px;
  padding: 9px 15px;
  background-color: #b4b4b4;
  border-radius: 8px;
  border: 1px solid #b4b4b4;
`;
export const Over14Label = styled.label`
  ${alignment}
  color: red;
  font-size: 25px;
  margin-top: 40px;
  margin-left: -550px;
  div {
    color: black;
  }
`;
export const Over14CheckBox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s;

  /* 체크된 상태 */
  &:checked {
    background-color: #000;
    border-color: #000;
  }

  /* 체크된 상태의 내부 원 */
  &:checked::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
  }
`;
export const AlreadyMemberBt = styled.button`
  font-size: 25px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
`;
export const SignUpBt = styled.button`
  font-size: 25px;
  background-color: #f3f3f3;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
`;
export const SignUpBtWrap = styled.div`
  ${alignment}
  margin-top:125px;
  gap: 50px;
`;
