import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
    // resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const addTeamMember = (member) => {
    setTeamMembers((prevMembers) => [...prevMembers, member]);
  };

  const me = { id: 3 };

  const project = [
    {
      signedUserNo: 1,
      title: "",
      description: "",
      startAt: "2024-11-11",
      deadLine: "2024-12-12",
      memberNoList: [1, 2, 3],
    },
  ];
  const handleSubmitForm = async (data) => {
    try {
      const formData = new FormData();
      formData.append(
        "req",
        JSON.stringify({
          email: data.email,
          userId: data.nickname,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        }),
      );

      const response = await axios.post("/api/", formData, {
        // 작업해야됨
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
        },
      });

      console.log("회원가입 성공:", response.data);
      // 회원가입 후 처리 (로그인 페이지로 이동 등)
    } catch (error) {
      console.error("회원가입 실패:", error);
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
      <AddModal
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        addTeamMember={addTeamMember}
      />
    </ProjectCreationForm>
  );
}

export default ProjectCreationPage;
