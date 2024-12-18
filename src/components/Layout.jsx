import Header from "./basic/header/index";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
};
export default Layout;
