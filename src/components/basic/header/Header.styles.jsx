import styled from "@emotion/styled";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const HeaderLogo = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  cursor: pointer;
`;

export const HeaderMenuWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

export const HeaderButton = styled.div`
  padding: 25px 30px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
