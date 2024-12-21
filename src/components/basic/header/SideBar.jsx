import { SideBarProfile } from "./SideBar.styles";

const SideBar = () => {
  return (
    <>
      <div>
        <SideBarProfile src="public\profile-image-mock.jpg" alt="profilePic" />
        <p>단단무지</p>
      </div>
      <div>
        <ul>
          <li>홈</li>
          <li>일정</li>
          <li>프로젝트</li>
          <li>마이페이지</li>
          <li>로그아웃</li>
        </ul>
      </div>
    </>
  );
};
export default SideBar;
