import styled from "@emotion/styled";
import { LuCircleUser } from "react-icons/lu";

const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const information = `
  padding: 4.5px;  // Reduced by 10%
  font-size: 18px;  // Reduced by 10%
  width: 22.5vw;  // Reduced by 10%
  border-radius: 5px;
  border: 2px solid #7a7a7a;
  background-color: #f4f4f4;
  &:focus {
    outline: none;
    border: 2px solid #7a7a7a;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  label {
    font-size: 18px;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  button {
    background-color: #dfdfdf;
    color: #000;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;

    font-size: 15px;
  }

  button:hover {
    background-color: #ff4500;
  }
`;

export const ProjectCreationLayout = styled.div`
  background-color: #fcfbfb;
`;

export const ProjectCreationForm = styled.form`
  ${alignment};
  flex-direction: column;
  h1 {
    font-size: 19.8px; // Reduced by 10%
    margin-top: 2.7vw; // Reduced by 10%
    margin-right: 49.5vw; // Reduced by 10%
    margin-bottom: 5.4vh; // Reduced by 10%
  }
`;

export const ProjectCreationWrap = styled.div`
  display: flex;
  label {
    font-size: 19.8px; // Reduced by 10%
    font-weight: 550;
    margin-right: 2.7vw; // Reduced by 10%
  }
`;

export const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: calc(9px + 4.5vw); // Reduced by 10%
  label {
    margin-bottom: 3.6vh; // Reduced by 10%
  }
`;

export const Calendar = styled.div`
  width: 22.5vw; // Reduced by 10%
  height: 45vh; // Reduced by 10%
  background-color: #f4f4f4;
`;

export const ProjectInformation = styled.div``;

export const InformationWrap = styled.div`
  display: flex;
  align-items: ${(props) => (props.projectDetails ? "none" : "center")};
  margin-top: 3.6px; // Reduced by 10%
  margin-bottom: 4.5vh; // Reduced by 10%
  max-width: 612px; // Reduced by 10%
`;

export const InformationLabel = styled.label`
  margin-top: 4.5px; // Reduced by 10%
`;

export const InformationInput = styled.input`
  ${information}
`;

export const InformationText = styled.textarea`
  ${information}
  height: 315px; // Reduced by 10%
  resize: none;
`;

export const AddTeamMemberBt = styled.button`
  ${alignment};
  border: none;
  background-color: transparent;
  div {
    font-size: 18px; // Reduced by 10%
    font-weight: 500;
  }
`;

export const StyledLuCircleUser = styled(LuCircleUser)`
  font-size: 45px; // Reduced by 10%
`;

export const ProjectCreationFormBT = styled.button`
  margin-top: 25px;
  ${alignment};
  font-size: 18px; // Reduced by 10%
  font-weight: 550;
  border: none;
  background-color: transparent;
`;
