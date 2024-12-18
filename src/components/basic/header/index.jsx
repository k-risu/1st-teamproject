import Header from "./Header";
import { Container, HeaderContainer, SideBarContainer } from "./index.styled";
import SideBar from "./SideBar";

const index = () => {
  return (
    <>
      <Container>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
      </Container>
    </>
  );
};
export default index;
