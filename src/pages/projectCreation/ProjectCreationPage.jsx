import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isLogin } from "../../utils/isLogin";
import Swal from "sweetalert2";

function ProjectCreationPage() {
  const [cookies] = useCookies("signedUserNo");
  const navigate = useNavigate();

  const location = useLocation();
  const [clickUserData, setClickUserData] = useState({
    userNo: cookies.signedUserNo,
    nickname: location.state?.nickname,
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // AddModal 상태
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // DateModal 상태
  const [teamMembers, setTeamMembers] = useState([clickUserData]); // 팀 구성원 상태
  const [eventData, setEventData] = useState({});
  const [selectDate, setSelectDate] = useState([]);
  const [changeDate, setChangeDate] = useState([]);

  const openAddModal = () => setIsAddModalOpen(true); // AddModal 열기
  const closeAddModal = () => setIsAddModalOpen(false); // AddModal 닫기

  const openDateModal = () => {
    setIsDateModalOpen(true); // DateModal 열기
  };
  const closeDateModal = () => {
    setIsDateModalOpen(false); // DateModal 닫기
  };

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const addTeamMember = () => {
    closeAddModal();
  };
  const handleSubmitForm = async (data) => {
    console.log(teamMembers.map((item) => item.userNo));
    const payload = {
      signedUserNo: cookies.signedUserNo,
      title: data.title,
      description: data.description,
      startAt: eventData.startAt.replace(/-/g, ""),
      deadLine: eventData.deadLine.replace(/-/g, ""),
      memberNoList: teamMembers.map((item) => item.userNo),
    };
    try {
      if (payload.title === "") {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "프로젝트 이름을 입력해주세요.",
        });
      }
      if (payload.description === "") {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "프로젝트 내용을 입력해주세요.",
        });
      }
      console.log(payload);

      if (payload.startAt === undefined && payload.deadLine === undefined) {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "프로젝트 기간을 설정해주세요.",
        });
      }

      const res = await axios.post(`/api/project`, payload);
      console.log(res);
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "프로젝트가 생성되었습니다!",
      });
      setTimeout(() => {
        navigate(`/schedule`);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const eventSelectHandler = (data) => {
    const userSelectedDate = {
      startAt: data?.startStr,
      deadLine: dayjs(data?.endStr).subtract(1, "day").format("YYYY-MM-DD"),
    };

    setEventData(userSelectedDate);
    openDateModal(userSelectedDate);
    setSelectDate([
      {
        title: "",
        start: data.startStr.replace(/-/g, ""),
        end: data.endStr.replace(/-/g, ""),
        backgroundColor: "#58ACFA",
        borderColor: "#58ACFA",
      },
    ]);
  };

  const eventChangeHandler = (data) => {
    const userChangeDate = {
      startAt: data.event.startStr,
      deadLine: dayjs(data.event.endStr)
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
    };
    console.log(userChangeDate);

    setEventData(userChangeDate);
    setChangeDate([
      {
        title: "",
        start: data.event.startStr.replace(/-/g, ""),
        end: data.event.endStr.replace(/-/g, ""),
        backgroundColor: "#58ACFA",
        borderColor: "#58ACFA",
      },
    ]);
  };

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  return (
    <ProjectCreationForm onSubmit={handleSubmit(handleSubmitForm)}>
      <h1>새 프로젝트 시작하기</h1>
      <ProjectCreationWrap>
        <CalendarWrap>
          <label>프로젝트 기간</label>
          <FullCalendar
            height={600}
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
            eventChange={eventChangeHandler}
            events={selectDate}
          />
          {isDateModalOpen && (
            <DateModal
              isOpen={isDateModalOpen}
              closeModal={closeDateModal}
              eventData={eventData}
              setEventData={setEventData}
              selectDate={selectDate}
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
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
      />
    </ProjectCreationForm>
  );
}

export default ProjectCreationPage;
