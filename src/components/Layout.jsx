import Header from "./basic/header/index";
import { SideBarContainer } from "./basic/header/index.styled";
import SideBar from "./basic/sidebar/SideBar";
import { Container, Main, MainContainer } from "./Layout.styles";

const Layout = ({ children }) => {
  return (
    <>
      <Container className="Container">
        <SideBarContainer className="SideBarContainer">
          <SideBar />
        </SideBarContainer>
        <MainContainer className="MainContainer">
          <Header></Header>
          <Main className="Main">{children}</Main>
        </MainContainer>
      </Container>
    </>
  );
};
export default Layout;
