import { useLocation } from "react-router-dom";
import Header from "./basic/header/index";
import { SideBarContainer } from "./basic/header/index.styled";
import SideBar from "./basic/sidebar/SideBar";
import { Container, Main, MainContainer } from "./Layout.styles";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Container className="Container">
        {pathname === "/schedule" || pathname === "/projectcreationpage" ? (
          <SideBarContainer className="SideBarContainer">
            <SideBar />
          </SideBarContainer>
        ) : (
          <></>
        )}
        <MainContainer className="MainContainer">
          {pathname === "/schedule" || pathname === "/projectcreationpage" ? (
            <Header></Header>
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
