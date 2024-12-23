import styled from "@emotion/styled";

export const CalendarLayout = styled.section`
  max-width: 1440px;
  width: 1200px;
  height: 700px;
  background-color: white;

  .fc .fc-toolbar-title {
    font-weight: normal;
  }

  /* 일요일 날짜: 빨간색 */
  .fc .fc-day-sun a {
    color: #db3a34;
  }

  /* 토요일 날짜: 파란색 */
  .fc .fc-day-sat a {
    color: #3f37c9;
  }

  .fc-event {
    padding-left: 10px;
  }

  .fc-day fc-day-wed fc-day-past fc-daygrid-day {
    max-height: 150px;
  }

  .fc .fc-toolbar-chunk .fc-button:disabled {
    color: #e8e8e8;
    border: none;
    background-color: #000000;
  }

  .fc fc-prev-button fc-button fc-button-primary {
    border: none;
  }

  .fc fc-next-button fc-button fc-button-primary {
    border: none;
  }

  .fc-scrollgrid-sync-inner a {
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
