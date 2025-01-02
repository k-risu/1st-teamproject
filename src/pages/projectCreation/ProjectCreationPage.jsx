import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddModal from "./AddModal";
import { DateModal } from "./DateModal";
import {
  AddTeamMemberBt,
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
import { useNavigate } from "react-router-dom";

function ProjectCreationPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // AddModal 상태
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // DateModal 상태
  const [teamMembers, setTeamMembers] = useState([]); // 팀 구성원 상태
  const [eventData, setEventData] = useState({});
  const [selectDate, setSelectDate] = useState([]);

  const openAddModal = () => setIsAddModalOpen(true); // AddModal 열기
  const closeAddModal = () => setIsAddModalOpen(false); // AddModal 닫기

  const openDateModal = () => {
    setIsDateModalOpen(true); // DateModal 열기
  };
  const closeDateModal = () => {
    setIsDateModalOpen(false); // DateModal 닫기
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const addTeamMember = () => {
    closeAddModal();
  };

  const handleSubmitForm = async (data) => {
    try {
      const payload = {
        signedUserNo: 62,
        title: data.title,
        description: data.description,
        startAt: eventData.startAt,
        deadLine: eventData.deadLine,
        memberNoList: teamMembers.map((item) => item.userNo),
      };
      const res = await axios.post(`/api/project`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      alert("프로젝트가 성공적으로 생성되었습니다!");
      navigate(`/schedule`);
    } catch (error) {
      console.error(error);
      alert("프로젝트 생성 중 오류가 발생했습니다.");
      return;
    } finally {
      reset();
    }
  };

  const eventSelectHandler = async (data) => {
    const selectedDate = {
      startAt: data.startStr,
      deadLine: dayjs(data.endStr).subtract(1, "day").format("YYYY-MM-DD"),
    };
    await setEventData(selectedDate);
    await openDateModal(selectedDate);
    await setSelectDate({
      ...selectedDate,
      start: selectedDate.startAt,
      end: selectedDate.deadLine,
    });
  };

  const eventHandler = (e) => {
    setSelectDate(e);
  };

  return (
    <ProjectCreationForm onSubmit={handleSubmit(handleSubmitForm)}>
      <h1>새 프로젝트 시작하기</h1>
      <ProjectCreationWrap>
        <CalendarWrap>
          <label>프로젝트 기간</label>
          <FullCalendar
            height={400}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            headerToolbar={{
              left: "title",
              center: "",
              right: "today,prev,next",
            }}
            locale={"ko"}
            weekends={true}
            expandRows={true}
            buttonText={{
              today: "오늘",
            }}
            select={eventSelectHandler}
            events={selectDate}
            eventsSet={eventHandler}
          />
          {isDateModalOpen && (
            <DateModal
              isOpen={isDateModalOpen}
              closeModal={closeDateModal}
              eventData={eventData}
              setEventData={setEventData}
              setSelectDate={setSelectDate}
            />
          )}
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
        setTeamMembers={setTeamMembers}
      />
    </ProjectCreationForm>
  );
}

export default ProjectCreationPage;
