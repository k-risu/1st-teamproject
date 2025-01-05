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

  const addTeamMember = () => {
    setTeamMembers(teamMembers);
    closeAddModal();
  };

  const handleSubmitForm = async (data) => {
    console.log(data);
    console.log(eventData);
    console.log(clickProjectData.projectNo);
    console.log(clickProjectData.memberList);
    console.log(teamMembers[1]);

    try {
      const payload = {
        signedUserNo: cookies.signedUserNo,
        projectNo: clickProjectData.projectNo,
        title: data.title,
        description: data.description,
        startAt: eventData.startAt,
        deadLine: eventData.deadLine,
        // memberNoList: teamMembers[1].filter((item) => {
        //   return item.userNo;
        // }),
      };
      const res = await axios.put(`/api/project`, payload);
      const resMember = await axios.post(`/api/project/search-user`, {
        signedUserNo: cookies.signedUserNo,
        projectNo: clickProjectData.projectNo,
        insertUserNoList: teamMembers[1].filter((item) => {
          return item.userNo;
        }),
        deleteUserNoList: [],
      });
      console.log(res);
      console.log(resMember);

      const Toast = Swal.mixin({
        toast: true,
        position: "top",
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
    } catch (error) {
      console.error(error);
      alert("프로젝트 생성 중 오류가 발생했습니다.");
      return;
    } finally {
      reset();
    }
  };

  const eventSelectHandler = async (data) => {
    console.log(data);

    const userSelectedDate = {
      startAt: data.startStr,
      deadLine: dayjs(data.endStr).subtract(1, "day").format("YYYY-MM-DD"),
    };
    await setEventData(userSelectedDate);
    await openDateModal(userSelectedDate);
    await setSelectDate((prev = []) => {
      return [
        ...prev,
        {
          title: "선택한 기간",
          start: data.startStr,
          end: data.endStr,
          backgroundColor: "lightblue",
          borderColor: "blue",
        },
      ];
    });
    console.log(selectDate);
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
