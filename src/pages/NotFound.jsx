import { BiCalendar } from "react-icons/bi";
import { ImSad } from "react-icons/im";
import {
  NotFoundLayout,
  ContentWrapper,
  SadIcon,
  NotFoundTitle,
  NotFoundDescription,
  CalendarIcon,
} from "./NotFound.styles";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <NotFoundLayout>
      <ContentWrapper>
        <SadIcon>
          <ImSad />
        </SadIcon>
        <NotFoundTitle>Not Found 404</NotFoundTitle>
        <NotFoundDescription>
          요청하신 페이지를 찾을 수 없습니다.
        </NotFoundDescription>
        <CalendarIcon
          onClick={() => {
            navigate("/schedule");
          }}
        >
          <BiCalendar />
          <span>메인 화면으로</span>
        </CalendarIcon>
      </ContentWrapper>
    </NotFoundLayout>
  );
}

export default NotFound;
