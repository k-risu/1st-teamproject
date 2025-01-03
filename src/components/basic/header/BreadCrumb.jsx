import { MdOutlineDoubleArrow } from "react-icons/md";

const BreadCrumb = ({ children }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <MdOutlineDoubleArrow style={{ fontSize: 30 }} />
      {children}
      <div style={{ textWrap: "nowrap" }}>달력</div>
      {/* <MdOutlineDoubleArrow style={{ fontSize: 30 }} /> */}
    </div>
  );
};
export default BreadCrumb;
