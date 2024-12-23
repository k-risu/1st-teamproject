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
          <SideBarProfileImg
            src="public\profile-image-mock.jpg"
            alt="profileImage"
          />
          <p>단단무지</p>
        </SideBarProfile>
        <SideBarMenuWrap>
          <SideBarMenu>
            <BiHomeAlt style={{ fontSize: 35 }} />홈
          </SideBarMenu>
          <SideBarMenu>
            <BiCalendar style={{ fontSize: 35 }} />
            일정
          </SideBarMenu>
          <SideBarMenu>
            <BiBarChartSquare style={{ fontSize: 35 }} />
            프로젝트
          </SideBarMenu>
          <SideBarMenu>
            <BiUserCircle style={{ fontSize: 35 }} />
            마이페이지
          </SideBarMenu>
          <SideBarMenu>
            <BiLogOut style={{ fontSize: 35 }} />
            로그아웃
          </SideBarMenu>
        </SideBarMenuWrap>
      </SideBarContainer>
    </>
  );
};
export default SideBar;
