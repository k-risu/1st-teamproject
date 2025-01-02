import { ResponsiveBullet } from "@nivo/bullet";

const renderProgressBar = (scheduleList) => {
  const totalTasks = scheduleList.length;
  const completedTasks = scheduleList.filter((task) => task.checked).length;
  const progressData = [
    {
      id: "progress",
      ranges: [0, totalTasks],
      measures: [completedTasks],
      markers: [],
    },
  ];
  return (
    <div style={{ height: "50px", width: "250px", margin: "0 auto" }}>
      <ResponsiveBullet
        data={progressData}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        spacing={46}
        layout="horizontal"
        titleAlign="start"
        titleOffsetX={-70}
        measureSize={0.3}
        rangeColors={["#E8E8E8"]}
        measureColors={["#67DA6F"]}
      />
    </div>
  );
};
export default renderProgressBar;
