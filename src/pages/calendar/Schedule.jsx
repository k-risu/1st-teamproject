import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CalendarLayout, ModalTitle, ProfileImage } from "./Schedule.styles";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Schedule = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalXY, setModalXY] = useState({ x: -1000, y: -1000 });
  const [imageUrls, setImageUrls] = useState([]);
  const [clickEventData, setClickEventData] = useState([]);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const [cookies] = useCookies(["signedUserNo"]);

  const navigate = useNavigate();

  const ModalLayout = styled.div`
    width: 250px;
    height: 120px;
    background-color: whitesmoke;
    position: fixed;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 3px;

    left: ${(props) => `${props.modalXY.x}px`};
    top: ${(props) => `${props.modalXY.y}px`};

    z-index: 99;
  `;

  useEffect(() => {
    const date = dayjs().format("YYYYMM");
    const signedUserNo = cookies.signedUserNo;

    const getEvents = async () => {
      try {
        const res = await axios.get(
          `api/main?date=${date}&signedUserNo=${signedUserNo}`,
        );
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
        console.log(error);
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

  // const mouseOverHandler = async (e) => {
  //   const classList = [...e.nativeEvent.target.classList];

  //   const clickModalHandler = (e) => {
  //     if (imageUrls.length === 0 && e.event) {
  //       getMemberPics();
  //       setImageUrls([]);
  //     } else {
  //       return;
  //     }
  //   };

  //   setIsMouseOver(true);
  //   if (isMouseOver === false) return;

  //   if (
  //     classList.filter(
  //       (item) => item === "fc-event-title" || item === "fc-h-event",
  //     ).length !== 0
  //   ) {
  //     setModalXY({
  //       x: e.clientX,
  //       y: e.clientY,
  //     });
  //     setIsOpenModal(true);
  //     await clickModalHandler(e);
  //     console.log("마우스오버");
  //   }

  //   setTimeout(() => {
  //     setIsMouseOver(false);
  //   }, 1000);
  // };

  return (
    <CalendarLayout
      onClick={(e) => eventClickHandler(e)}
      // onMouseOver={(e) => mouseOverHandler(e)}
      // onMouseOut={() => setIsOpenModal(false)}
    >
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
          <ModalTitle>
            {clickEventData.map((item) => (
              <span key={item.projectNo} onClick={() => navigate(`/project`)}>
                {item.title}의 구성원
              </span>
            ))}
          </ModalTitle>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            style={{ padding: "5px 10px" }}
          >
            {imageUrls.map((item, index) => (
              <SwiperSlide key={index}>
                <ProfileImage
                  src={
                    item.pic === null
                      ? "public/profile8.jpg"
                      : `${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`
                  }
                  alt="구성원 프로필 이미지"
                  onClick={() => navigate(`/mypage`)}
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
