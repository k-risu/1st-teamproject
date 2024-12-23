import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarLayout } from "./Schedule.styles";
import { useState } from "react";
import dayjs from "dayjs";
import useModal from "../../hooks/useModal";

const monthSchedule = {
  project1: {
    projectName: "팀 프로젝트",
    startStr: "2024-12-21",
    endStr: "2025-01-10",
  },
  project2: {
    projectName: "스터디 모임",
    startStr: "2024-11-11",
    endStr: "2024-12-18",
  },
  project3: {
    projectName: "조별과제",
    startStr: "2024-10-05",
    endStr: "2024-12-03",
  },
};

const Schedule = () => {
  const { Modal, open, close } = useModal();
  const [currentEvents, setCurrentEvents] = useState(monthSchedule);

  const eventSelectHandler = (selectData) => {
    const title = prompt("이 프로젝트의 이름을 알려주세요");
    const calendarAPI = selectData.view.calendar;
    const endDate = dayjs(selectData.end)
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    calendarAPI.unselect();

    if (title) {
      calendarAPI.addEvent({
        title,
        start: selectData.startStr,
        end: selectData.endStr,
        allday: selectData.allDay,
      });
      console.log(selectData.startStr);
      console.log(selectData.endStr);
      console.log(endDate);
    }
  };

  const eventClickHandler = (clickData) => {
    if (
      confirm(`정말 이 프로젝트를 삭제 하시겠습니까? ${clickData.event.title}`)
    ) {
      clickData.event.remove();
    }
  };

  const eventHandler = (e) => {
    setCurrentEvents(e);
  };

  return (
    <CalendarLayout>
      <FullCalendar
        height={700}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        droppable={true}
        headerToolbar={{
          left: "title",
          center: "",
          right: "today,prev,next",
        }}
        select={eventSelectHandler}
        eventClick={eventClickHandler}
        eventsSet={eventHandler}
        locale={"ko"}
        weekends={true}
        dayMaxEvents={2}
        expandRows={true}
        buttonText={{
          today: "오늘",
        }}
        events={{ ...currentEvents, key: "value" }}
      />
    </CalendarLayout>
  );
};
export default Schedule;
