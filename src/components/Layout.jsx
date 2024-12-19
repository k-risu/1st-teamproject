import Header from "./basic/header/index";
import { Main } from "./Layout.styles";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <Main>{children}</Main>
    </>
  );
};
export default Layout;
