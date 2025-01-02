import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CalendarLayout, ProfileImage } from "./Schedule.styles";

const Schedule = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalXY, setModalXY] = useState({ x: -1000, y: -1000 });
  const [imageUrls, setImageUrls] = useState([]);
  const [clickEventData, setClickEventData] = useState([]);

  const ModalLayout = styled.div`
    width: 250px;
    height: 120px;
    background-color: whitesmoke;
    position: fixed;
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px 10px;
    left: ${(props) => `${props.modalXY.x}px`};
    top: ${(props) => `${props.modalXY.y}px`};

    z-index: 99;
  `;

  useEffect(() => {
    const date = dayjs().format("YYYYMM");

    const getEvents = async () => {
      try {
        const res = await axios.get(`api/main?date=${date}&signedUserNo=62`);
        const userCurrentEvents = res.data.projectList.map((item) => {
          return {
            projectNo: item.projectNo,
            title: item.title,
            start: item.startAt,
            end: dayjs(item.deadline).add(1, "day").format("YYYY-MM-DD"),
            color: "",
            textColor: "",
          };
        });
        console.log(userCurrentEvents);

        setCurrentEvents(userCurrentEvents);
        getMemberPics(userCurrentEvents);
        setClickEventData(
          userCurrentEvents.filter((item) => {
            return item.projectNo, item.title;
          }),
        );
      } catch (error) {
        console.error("데이터 가져오기 실패 : ", error);
      }
    };
    getEvents();
  }, []);

  const getMemberPics = async (item) => {
    const userProjectNo = await item.map((e) => {
      return e.projectNo;
    });

    // try {
    //   const res = await userProjectNo.map((item) => {
    //     return axios.get(`api/main/{projectNo}?projectNo=${item}`);
    //   });

    //   console.log(res);

    //   setImageUrls(res.data.memberList);

    try {
      const req = userProjectNo.map((projectNo) =>
        axios.get(`api/main/{projectNo}?projectNo=${projectNo}`),
      );

      const res = await Promise.all(req);

      const memberLists = res.map((item) => item.data.memberList);

      console.log(memberLists);
      console.log(memberLists.flat());
      setImageUrls(memberLists.flat());
    } catch (error) {
      console.log(error);
    }
  };

  const eventClickHandler = async (e) => {
    const classList = [...e.nativeEvent.target.classList];

    if (
      classList.filter(
        (item) => item === "fc-event-title" || item === "fc-h-event",
      ).length !== 0
    ) {
      setModalXY({
        x: e.clientX,
        y: e.clientY,
      });
      setIsOpenModal(true);
      await clickModalHandler(e);
    } else {
      setIsOpenModal(false);
    }
    console.log("새로 요청됨", e.nativeEvent.target.textContent);
  };

  const clickModalHandler = (e) => {
    if (imageUrls.length === 0 && e.event) {
      getMemberPics();
      setImageUrls([]);
    } else {
      return;
    }
  };

  return (
    <CalendarLayout onClick={(e) => eventClickHandler(e)}>
      <FullCalendar
        height={700}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          center: "",
          right: "today,prev,next",
        }}
        eventClick={clickModalHandler}
        locale={"ko"}
        weekends={true}
        dayMaxEvents={3}
        expandRows={true}
        buttonText={{
          today: "오늘",
        }}
        events={currentEvents}
      />
      {isOpenModal && (
        <ModalLayout modalXY={modalXY}>
          {clickEventData.map((item) => (
            <span key={item.projectNo}>{item.title}의 구성원</span>
          ))}
          <Swiper slidesPerView={4} spaceBetween={20}>
            {imageUrls.map((item, index) => (
              <SwiperSlide key={index}>
                <ProfileImage
                  src={
                    item.pic === null
                      ? "public/profile8.jpg"
                      : `${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`
                  }
                  alt="구성원 프로필 이미지"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalLayout>
      )}
    </CalendarLayout>
  );
};

export default Schedule;
