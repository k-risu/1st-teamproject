import { useLocation } from "react-router-dom";
import Header from "./basic/header/index";
import SideBar from "./basic/sidebar/SideBar";
import { Container, Main, MainContainer } from "./Layout.styles";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Container className="Container">
        {pathname === "/schedule" ||
        pathname === "/projectcreationpage" ||
        pathname === "/project" ||
        pathname === "/projectlist" ||
        pathname === "/projectmembers" ||
        pathname === "/mypage" ||
        pathname === "/mypage/edit" ? (
          <SideBar />
        ) : (
          <></>
        )}
        <MainContainer className="MainContainer">
          {pathname === "/schedule" ||
          pathname === "/projectcreationpage" ||
          pathname === "/project" ||
          pathname === "/projectlist" ||
          pathname === "/projectmembers" ||
          pathname === "/mypage" ||
          pathname === "/mypage/edit" ? (
            <Header />
          ) : (
            <></>
          )}
          <Main className="Main">{children}</Main>
        </MainContainer>
      </Container>
    </>
  );
};
export default Layout;
