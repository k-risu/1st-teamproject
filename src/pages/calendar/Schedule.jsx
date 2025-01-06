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
import { isLogin } from "../../utils/isLogin";

const Schedule = () => {
  const [currentEvents, setCurrentEvents] = useState([
    {
      backgroundColor: "#58ACFA",
      borderColor: "#58ACFA",
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalXY, setModalXY] = useState({ x: -1000, y: -1000 });
  const [imageUrls, setImageUrls] = useState([]);
  const [clickEventData, setClickEventData] = useState([]);
  const [clickProjectNo, setClickProjectNo] = useState(0);

  const [cookies] = useCookies(["signedUserNo"]);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin({ navigate, cookies });
  }, []);

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
        const res = await axios.get(`/api/main`, {
          params: {
            date: date,
            signedUserNo: signedUserNo,
          },
        });
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

        console.log(res);
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

  const getMemberPics = async (e) => {
    try {
      const res = await axios.get(`/api/main/{projectNo}`, {
        params: {
          projectNo: e,
        },
      });
      setImageUrls(res.data.memberList);
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
      setImageUrls([]);
    }
    console.log("새로 요청됨", e.nativeEvent.target.textContent);
  };

  const clickModalHandler = async (e) => {
    const clickEventTitle = e.event.title;
    const clickProjectData = await currentEvents.filter(
      (item) => clickEventTitle === item.title,
    );
    const clickProjectNo = clickProjectData[0].projectNo;

    setClickProjectNo(clickProjectData[0].projectNo);

    if (e.event) {
      getMemberPics(clickProjectNo);
      setImageUrls([]);
    } else {
      setImageUrls([]);
    }
  };

  const clickProjectHandler = (e) => {
    console.log(e);

    navigate(`/project/dashboard`, {
      state: {
        projectNo: e,
      },
    });
  };

  const clickUserHandler = (e) => {
    console.log(e);

    navigate(`/mypage`, {
      state: {
        targetUserNo: e,
      },
    });
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
          <ModalTitle>
            {clickEventData.map((item) => {
              if (clickProjectNo === item.projectNo) {
                return (
                  <span
                    key={item.projectNo}
                    onClick={() => clickProjectHandler(item.projectNo)}
                  >
                    {item.title}의 구성원
                  </span>
                );
              }
            })}
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
                      ? "/default_profile.jpg"
                      : `${import.meta.env.VITE_BASE_URL}/pic/user/${item.userNo}/${item.pic}`
                  }
                  alt="구성원 프로필 이미지"
                  onClick={() => clickUserHandler(item.userNo)}
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
