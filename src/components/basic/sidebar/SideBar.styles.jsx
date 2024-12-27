import styled from "@emotion/styled";

export const SideBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 10%;
  height: 100vh;
  align-items: center;
  position: absolute;
  border-left: 1px solid black;
  border-right: 1px solid black;
  gap: 30px;

  background-color: white;
`;

export const SideBarProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const SideBarProfileImg = styled.img`
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
  width: 100%;
  height: 100vh;
`;

export const SideBarMenu = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 25px;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
