import styled from "@emotion/styled";
const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
// export const ProjectCreationPageLayout = styled.div`
//   display: flex;
//   justify-content: center; /* 가로 중앙 정렬 */
//   max-width: 1600px; /* 최대 너비 설정 */
//   margin: 0 auto; /* 페이지 중앙 정렬 */
// `;

// export const Header = styled.div`
//   height: 75px;
//   background-color: red;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 1600px; /* 전체 화면 너비를 차지 */
//   z-index: 9999;
// `;

// export const Sidebar = styled.div`
//   width: 200px; /* 고정된 너비 */
//   height: 100%; /* 전체 화면 높이를 차지 */
//   background-color: burlywood;
//   position: fixed; /* 화면에 고정 */
//   top: 0;
//   left: 0;
//   z-index: 9997; /* 다른 요소 위에 나타나게 설정 */
// `;
// padding-top: 75px;
// margin-left: 200px;
// 870px 1450px
export const ProjectCreationform = styled.form`
  ${alignment};
  flex-direction: column;
  h1 {
    font-size: 22px;
    margin-top: 50px;
    margin-right: 750px;
    margin-bottom: 55px;
  }
`;
export const ProjectCreationWrap = styled.div`
  display: flex;
  /* margin-bottom: 35px; */

  label {
    font-size: 22px;
    font-weight: 550;
  }
`;
export const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 90px;
  label {
    margin-bottom: 35px;
  }
`;
export const Calendar = styled.div`
  width: 500px;
  height: 550px;
  background-color: #f4f4f4;
`;
export const ProjectInformation = styled.div``;
export const InformationWrap = styled.div`
  ${alignment}
  margin-top:4px;
  width: 680px;
`;
