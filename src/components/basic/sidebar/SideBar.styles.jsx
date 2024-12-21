import styled from "@emotion/styled";

export const SideBarProfile = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-top: 100px;
`;

export const SideBarMenuWrap = styled.ul`
  height: 100vh;
`;

export const SideBarMenu = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 35px;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
