import { SideBarMenu, SideBarMenuWrap, SideBarProfile } from "./SideBar.styles";
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
      <div>
        <SideBarProfile
          src="public\profile-image-mock.jpg"
          alt="profileImage"
        />
        <p>단단무지</p>
      </div>
      <SideBarMenuWrap>
        <SideBarMenu>
          <BiHomeAlt style={{ fontSize: 30 }} />홈
        </SideBarMenu>
        <SideBarMenu>
          <BiCalendar style={{ fontSize: 30 }} />
          일정
        </SideBarMenu>
        <SideBarMenu>
          <BiBarChartSquare style={{ fontSize: 40 }} />
          프로젝트
        </SideBarMenu>
        <SideBarMenu>
          <BiUserCircle style={{ fontSize: 45 }} />
          마이페이지
        </SideBarMenu>
        <SideBarMenu>
          <BiLogOut style={{ fontSize: 40 }} />
          로그아웃
        </SideBarMenu>
      </SideBarMenuWrap>
    </>
  );
};
export default SideBar;
