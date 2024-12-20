import styled from "@emotion/styled";
import { SlOptionsVertical } from "react-icons/sl";

const topColor = "#fcc0b2";
const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  height: 350px;
  width: 275px;
  background-color: #f5f5f5;
  border-radius: 12px;
  margin: 0 auto;
`;

export const CardTod = styled.div`
  height: 20px;
  background-color: ${topColor};
  border-radius: 7px 7px 0 0;
`;

export const CardImg = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  height: 47px;
  width: 47px;
  border-radius: 24px;
  background-color: blue;
`;
export const MoreOptionsIcon = styled(SlOptionsVertical)`
  position: absolute;
  font-size: 13px;
  right: 10px;
  top: 10px;
  color: #c0c0c0;
`;
export const MemberInfo = styled.div`
  display: flex;
  position: relative;
`;
export const MemberInfoWrap = styled.div`
  ${alignment};
  margin-left: 51px;
  flex-direction: column;
  h2 {
    font-size: 15px;
  }
  span {
    font-size: 10px;
    color: #c0c0c0;
  }
`;
// export const StatusMessage = styled.span`
//   display: flex;
//   margin: 15px;
//   font-size: 1px;
// `;
export const TaskList = styled.textarea`
  display: flex;
  margin: 0 auto;
  margin-top: 15px;
  font-size: 18px;
  width: 250px;
  border-radius: 5px;
  border: 2px solid #dedede;
  background-color: #dedede;
  &:focus {
    outline: none;
    border: 2px solid #dedede;
  }
  height: 200px;
  resize: none;
`;
export const ProgressBar = styled.div`
  width: 250px;
  height: 15px;
  background-color: #67da6f;
  margin: 0 auto;
  margin-top: 15px;
`;
