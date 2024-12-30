import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddModal from "./AddModal";
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
  const [teamMembers, setTeamMembers] = useState([]); // 팀 구성원 상태

  const openAddModal = () => setIsAddModalOpen(true); // AddModal 열기
  const closeAddModal = () => setIsAddModalOpen(false); // AddModal 닫기

  const openDateModal = () => setIsDateModalOpen(true); // DateModal 열기
  const closeDateModal = () => setIsDateModalOpen(false); // DateModal 닫기

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue, // setValue 사용
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const addTeamMember = () => {
    console.log();

    setTeamMembers((prev) => [...prev]);
  };

  const handleSubmitForm = async (data) => {
    try {
      const formData = new FormData();
      console.log(data);
      console.log(teamMembers);

      formData.append(
        "req",
        JSON.stringify({
          signedUserNo: data.signedUserNo,
          title: data.title,
          description: data.description,
          startAt: data.startStr,
          deadLine: data.endStr,
          memberNoList: teamMembers,
        }),
      );

      const res = await axios.post("/api/project/schedule", formData, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProjectCreationForm onSubmit={handleSubmit(handleSubmitForm)}>
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
            <InformationInput {...register("title")} />
            {/* 오류 메세지 */}
            <p style={{ color: "red" }}>{errors.title?.message}</p>
          </InformationWrap>
          <InformationWrap projectDetails={true}>
            <InformationLabel>프로젝트 내용</InformationLabel>
            <InformationText {...register("description")} />
            {/* 오류 메세지 */}
            <p style={{ color: "red" }}>{errors.description?.message}</p>
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
      <AddModal
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        addTeamMember={addTeamMember}
      />
    </ProjectCreationForm>
  );
}

export default ProjectCreationPage;
