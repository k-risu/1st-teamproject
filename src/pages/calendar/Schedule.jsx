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
        const res = await axios.get(`api/main?date=${date}&signedUserNo=2`);
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
      } catch (error) {
        console.error("데이터 가져오기 실패 : ", error);
      }
    };
    getEvents();
  }, []);

  const date = dayjs().format("YYYYMM");

  const getEvents = async () => {
    try {
      const res = await axios.get(`api/main?date=${date}&signedUserNo=2`);
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
    } catch (error) {
      console.error("데이터 가져오기 실패 : ", error);
    }
  };

  const getMemberPics = async (item) => {
    console.log(item);
    const userProjectNo = await item.map((e) => {
      return e.projectNo;
    });
    console.log(userProjectNo);

    // try {
    //   const res = await userProjectNo.map((item) => {
    //     return axios.get(`api/main/{projectNo}?projectNo=${item}`);
    //   });

    //   console.log(res);

    //   setImageUrls(res.data.memberList);

    try {
      // 비동기 요청 배열 생성
      const requests = userProjectNo.map((projectNo) =>
        axios.get(`api/main/{projectNo}?projectNo=${projectNo}`),
      );

      // 모든 비동기 요청 처리
      const responses = await Promise.all(requests);

      // 결과에서 필요한 데이터 추출
      const memberLists = responses.map((res) => res.data.memberList);

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
  };

  const clickModalHandler = (e) => {
    if (imageUrls.length === 0 && e.event) {
      getMemberPics();
      setImageUrls([]);
      console.log(e);
    } else {
      return;
    }
  };

  return (
    <CalendarLayout onClick={(e) => eventClickHandler(e)}>
      {/* <CalendarLayout> */}
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
        <ModalLayout modalXY={modalXY} currentEvents={currentEvents}>
          <span>{currentEvents.title}의 구성원</span>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            {imageUrls.map((item) => (
              <SwiperSlide key={item.userNo}>
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
