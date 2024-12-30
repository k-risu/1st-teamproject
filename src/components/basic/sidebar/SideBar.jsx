import { SideBarProfileImg } from "./SideBar.styles";
import {
  SideBarContainer,
  SideBarMenu,
  SideBarMenuWrap,
  SideBarProfile,
} from "./SideBar.styles";
import {
  BiHomeAlt,
  BiCalendar,
  BiBarChartSquare,
  BiUserCircle,
  BiLogOut,
} from "react-icons/bi";

const SideBar = () => {
  return (
    <>
      <SideBarContainer className="SideBarContainer">
        <SideBarProfile>
          <SideBarProfileImg src="public\profile8.jpg" alt="profileImage" />
          <span>단단무지</span>
        </SideBarProfile>
        <SideBarMenuWrap>
          <SideBarMenu>
            <BiHomeAlt style={{ fontSize: 35 }} />
            <p>홈</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiCalendar style={{ fontSize: 35 }} />
            <p>일정</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiBarChartSquare style={{ fontSize: 35 }} />
            <p>프로젝트</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiUserCircle style={{ fontSize: 35 }} />
            <p>마이페이지</p>
          </SideBarMenu>
          <SideBarMenu>
            <BiLogOut style={{ fontSize: 35 }} />
            <p>로그아웃</p>
          </SideBarMenu>
        </SideBarMenuWrap>
      </SideBarContainer>
    </>
  );
};
export default SideBar;
