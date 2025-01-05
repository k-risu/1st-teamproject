import { useLocation } from "react-router-dom";
import Header from "./basic/header/index";
import SideBar from "./basic/sidebar/SideBar";
import { Container, FullMain, Main, MainContainer } from "./Layout.styles";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Container>
        {pathname === "/schedule" ||
        pathname === "/project" ||
        pathname === "/project/create" ||
        pathname === "/project/edit" ||
        pathname === "/project/dashboard" ||
        pathname === "/project/members" ||
        pathname === "/mypage" ||
        pathname === "/mypage/edit" ? (
          <SideBar />
        ) : (
          <></>
        )}
        <MainContainer>
          {pathname === "/schedule" ||
          pathname === "/project" ||
          pathname === "/project/create" ||
          pathname === "/project/edit" ||
          pathname === "/project/dashboard" ||
          pathname === "/project/members" ||
          pathname === "/mypage" ||
          pathname === "/mypage/edit" ? (
            <Header />
          ) : (
            <></>
          )}

          {pathname === "/schedule" ||
          pathname === "/project" ||
          pathname === "/project/create" ||
          pathname === "/project/edit" ||
          pathname === "/project/dashboard" ||
          pathname === "/project/members" ||
          pathname === "/mypage" ||
          pathname === "/mypage/edit" ? (
            <Main>{children}</Main>
          ) : (
            <FullMain>{children}</FullMain>
          )}
        </MainContainer>
      </Container>
    </>
  );
};
export default Layout;
