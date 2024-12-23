import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarLayout } from "./Schedule.styles";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import useModal from "../../hooks/useModal";

const Schedule = () => {
  const { Modal, open, close } = useModal();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setCurrentEvents(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패 : ", error);
      }
    };

    fetchEvents();
  }, []);

  const eventSelectHandler = (selectData) => {
    setEventData(selectData);
    setIsInputModalOpen(true);
  };

  const handleEventCreate = async () => {
    if (!newEventTitle.trim()) return;

    const calendarAPI = eventData.view.calendar;
    const endDate = dayjs(eventData.end)
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    calendarAPI.unselect();

    const newEvent = {
      title: newEventTitle,
      start: eventData.startStr,
      end: endDate,
      allday: eventData.allDay,
    };

    try {
      const response = await axios.post("/api/", newEvent);
      const createdEvent = response.data;

      calendarAPI.addEvent(createdEvent);
    } catch (error) {
      console.error("일정 등록 실패 : ", error);
    } finally {
      setNewEventTitle("");
      setIsInputModalOpen(false);
      setEventData(null);
    }
  };

  const eventClickHandler = (clickData) => {
    setSelectedEvent(clickData.event);
    open();
  };

  const confirmDeleteHandler = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`/api/${selectedEvent.id}`);
        selectedEvent.remove();
      } catch (error) {
        console.error("일정 삭제 실패 : ", error);
      }
    }
    setSelectedEvent(null);
    close();
  };

  const cancelDeleteHandler = () => {
    setSelectedEvent(null);
    close();
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
        events={currentEvents}
      />
      <Modal>
        <div>
          <p>정말 이 프로젝트를 삭제하시겠습니까?</p>
          <div>
            <button onClick={confirmDeleteHandler}>확인</button>
            <button onClick={cancelDeleteHandler}>취소</button>
          </div>
        </div>
      </Modal>
      {isInputModalOpen && (
        <Modal>
          <div>
            <p>이 프로젝트의 이름을 알려주세요</p>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="프로젝트 이름을 입력해주세요"
            />
            <div>
              <button onClick={handleEventCreate}>확인</button>
              <button onClick={() => setIsInputModalOpen(false)}>취소</button>
            </div>
          </div>
        </Modal>
      )}
    </CalendarLayout>
  );
};

export default Schedule;
