import {
  Calendar,
  CalendarWrap,
  InformationWrap,
  ProjectCreationform,
  ProjectCreationWrap,
  ProjectInformation,
} from "./ProjectCreationPage.styles";

function ProjectCreationPage() {
  return (
    <ProjectCreationform>
      <h1>프로젝트 시작하기</h1>
      {/* <ProjectCreationPageLayout>
        <Header></Header>
        <Sidebar></Sidebar>
      </ProjectCreationPageLayout> */}
      <ProjectCreationWrap>
        <CalendarWrap>
          <label>프로젝트 기간</label>
          <Calendar>달력</Calendar>
        </CalendarWrap>
        <ProjectInformation>
          <InformationWrap>
            <label>프로젝트 이름</label>
            <input />
          </InformationWrap>
          <InformationWrap>
            <label>프로젝트 프로젝트 내용</label>
            <input />
          </InformationWrap>
          <InformationWrap>
            <label>프로젝트 구성원</label>
            <button>추가</button>
          </InformationWrap>
        </ProjectInformation>
      </ProjectCreationWrap>
      <button>생성하기</button>
    </ProjectCreationform>
  );
}
export default ProjectCreationPage;
