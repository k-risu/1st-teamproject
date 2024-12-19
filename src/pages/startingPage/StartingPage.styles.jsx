import styled from "@emotion/styled";

// const topColor = "#fcc0b2";

const buttonStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px; 
  font-size: 25px; 
  font-weight: 600;
  color: #ffffff;
  border-radius: 14px;
  background-color: #000000;
  cursor: pointer;
`;

// export const Card = styled.div`
//   height: 259px;
//   width: 205px;
//   background-color: red;
//   border-radius: 12px;
// `;

// export const CardTod = styled.div`
//   height: 14px;
//   background-color: ${topColor};
//   border-radius: 7px 7px 0 0;
// `;

// export const CardContent = styled.div`
//   height: 47px;
//   width: 47px;
//   border-radius: 24px;
//   background-color: blue;
// `;

export const LogoImg = styled.div`
  height: 268px;
  width: 268px;
  background-color: #7d7f87;
  margin-bottom: 43px;
  border-radius: 43px;
`;

export const SignUpBt = styled.button`
  ${buttonStyle};
  height: 54px;
  width: 162px;
  margin-bottom: 29px;
`;

export const LoginBt = styled.button`
  ${buttonStyle};
  height: 54px;
  width: 133px;
`;

export const Auth = styled.form`
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
