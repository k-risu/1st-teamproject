import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditMemberModal from "./EditMemberModal";
import EditDateModal from "./EditDateModal";
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
} from "../projectCreation/ProjectCreationPage.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isLogin } from "../../utils/isLogin";
import Swal from "sweetalert2";

const ProjectEditPage = () => {
  const location = useLocation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // AddModal 상태
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // DateModal 상태
  const [teamMembers, setTeamMembers] = useState([location.state?.memberList]); // 팀 구성원 상태
  const [eventData, setEventData] = useState({});
  const [changeDate, setChangeDate] = useState([]);
  const [selectDate, setSelectDate] = useState([
    {
      start: location.state?.startAt,
      end: dayjs(location.state?.deadLine).add(1, "day").format("YYYY-MM-DD"),
    },
  ]);

  const [clickProjectData, setclickProjectData] = useState({
    projectNo: location.state?.projectNo,
    title: location.state?.title,
    description: location.state?.description,
    startAt: location.state?.startAt,
    deadLine: location.state?.deadLine,
    memberList: location.state?.memberList,
  });

  const openAddModal = () => setIsAddModalOpen(true); // AddModal 열기
  const closeAddModal = () => setIsAddModalOpen(false); // AddModal 닫기

  const openDateModal = () => {
    setIsDateModalOpen(true); // DateModal 열기
  };
  const closeDateModal = () => {
    setIsDateModalOpen(false); // DateModal 닫기
  };

  const [cookies] = useCookies("signedUserNo");
  const navigate = useNavigate();

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

  const addTeamMember = async (data) => {
    const userList = [...clickProjectData.memberList, data.flat()].flat();
    const userNoList = userList.map((item) => {
      return item.userNo;
    });

    console.log(userList);
    console.log(userNoList);

    const payload = {
      signedUserNo: cookies.signedUserNo,
      projectNo: clickProjectData.projectNo,
      insertUserNoList: userNoList,
      deleteUserNoList: [],
    };

    const res = await axios.post(`/api/project/search-user`, payload);
    console.log(res);

    setTeamMembers([...teamMembers, userList]);
    closeAddModal();
  };

  const handleSubmitForm = async (data) => {
    console.log(data);

    let payload = {
      signedUserNo: cookies.signedUserNo,
      projectNo: clickProjectData.projectNo,
      title: data.title,
      description: data.description,
      startAt: eventData.startAt.replace(/-/g, ""),
      deadLine: eventData.deadLine.replace(/-/g, ""),
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

      const res = await axios.put(`/api/project`, payload);
      console.log(res);

      if (res.data.code === "OK") {
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
          title: "프로젝트가 수정되었습니다!",
        });
        setTimeout(() => {
          navigate(`/schedule`);
        }, 2000);
      } else {
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
          title: "프로젝트가 수정에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eventSelectHandler = async (data) => {
    console.log(data);

    const userSelectedDate = {
      startAt: data?.startStr,
      deadLine: dayjs(data?.endStr).subtract(1, "day").format("YYYY-MM-DD"),
    };

    await setEventData(userSelectedDate);
    await openDateModal(userSelectedDate);
    await setSelectDate(([]) => {
      return [
        {
          title: "",
          start: data.startStr,
          end: data.endStr,
          backgroundColor: "#58ACFA",
          borderColor: "#58ACFA",
        },
      ];
    });
    console.log(selectDate);
  };

  const eventChangeHandler = async (data) => {
    console.log(data.event.startStr);
    console.log(data.event.endStr);

    const userChangeDate = {
      startAt: data.event.startStr,
      deadLine: dayjs(data.event.endStr)
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
    };

    await setEventData(userChangeDate);
    await setChangeDate(([]) => {
      return [
        {
          title: "",
          start: data.event.startStr,
          end: data.event.endStr,
          backgroundColor: "#58ACFA",
          borderColor: "#58ACFA",
        },
      ];
    });
  };

  // 쿠키의 signedUserNo에 값이 없으면 로그인 하라는 알림창과 함께 이전 페이지로 이동

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

  return (
    <ProjectCreationForm onSubmit={handleSubmit(handleSubmitForm)}>
      <h1>{clickProjectData.title} 수정하기</h1>
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
            <EditDateModal
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
            <InformationInput
              {...register("title")}
              defaultValue={clickProjectData.title}
            />
            {/* 오류 메세지 */}
            <p style={{ color: "red" }}>{errors.title?.message}</p>
          </InformationWrap>
          <InformationWrap projectDetails={true}>
            <InformationLabel>프로젝트 내용</InformationLabel>
            <InformationText
              {...register("description")}
              defaultValue={clickProjectData.description}
            />
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
      <ProjectCreationFormBT type="submit">수정하기</ProjectCreationFormBT>
      {/* AddModal을 위한 버튼 클릭 시 */}
      <EditMemberModal
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        addTeamMember={addTeamMember}
        teamMembers={clickProjectData.memberList}
        setTeamMembers={setTeamMembers}
      />
    </ProjectCreationForm>
  );
};

export default ProjectEditPage;
