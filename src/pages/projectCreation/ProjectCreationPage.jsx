import { useState } from "react";
import { AddModal } from "./AddModal";
import { DateModal } from "./DateModal";
import {
  AddTeamMemberBt,
  Calendar,
  CalendarWrap,
  InformationInput,
  InformationLabel,
  InformationText,
  InformationWrap,
  ProjectCreationForm,
  ProjectCreationFormBT,
  ProjectCreationWrap,
  ProjectInformation,
  StyledLuCircleUser,
} from "./ProjectCreationPage.styles";

function ProjectCreationPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // AddModal 상태
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // DateModal 상태

  const openAddModal = () => setIsAddModalOpen(true); // AddModal 열기
  const closeAddModal = () => setIsAddModalOpen(false); // AddModal 닫기

  const openDateModal = () => setIsDateModalOpen(true); // DateModal 열기
  const closeDateModal = () => setIsDateModalOpen(false); // DateModal 닫기

  return (
    <ProjectCreationForm>
      <h1>새 프로젝트 시작하기</h1>
      <ProjectCreationWrap>
        <CalendarWrap>
          <label>프로젝트 기간</label>
          <Calendar onClick={openDateModal}>달력</Calendar>
          {/* DateModal 열기 */}
          <DateModal isOpen={isDateModalOpen} closeModal={closeDateModal} />
          {/* DateModal만 열림 */}
        </CalendarWrap>
        <ProjectInformation>
          <InformationWrap>
            <label>프로젝트 이름</label>
            <InformationInput />
          </InformationWrap>
          <InformationWrap projectDetails={true}>
            <InformationLabel>프로젝트 내용</InformationLabel>
            <InformationText />
          </InformationWrap>
          <InformationWrap>
            <label>프로젝트 구성원</label>
            <AddTeamMemberBt type="button" onClick={openAddModal}>
              <StyledLuCircleUser />
              <div>&nbsp;추가</div>
            </AddTeamMemberBt>
          </InformationWrap>
        </ProjectInformation>
      </ProjectCreationWrap>
      <ProjectCreationFormBT type="submit">생성하기</ProjectCreationFormBT>

      {/* AddModal을 위한 버튼 클릭 시 */}
      <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal} />
    </ProjectCreationForm>
  );
}

export default ProjectCreationPage;
