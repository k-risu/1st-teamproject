import { useState } from "react";

/**
 * CustomBullet 컴포넌트는 데이터 기반의 진행 상태를 시각적으로 표시합니다.
 * @param {Object[]} data - 진행 상태를 나타내는 데이터 배열
 * @param {number[]} data[].ranges - 전체 범위를 나타내는 값 배열 (예: [0, totalTasks])
 * @param {number[]} data[].measures - 완료된 범위를 나타내는 값 배열 (예: [completedTasks])
 * @returns {JSX.Element} - SVG 막대를 포함한 진행 상태 표시 컴포넌트
 */
const CustomBullet = ({ data }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleMouseEnter = (e, completed, total) => {
    const tooltipX = e.clientX;
    const tooltipY = e.clientY;
    setTooltip({
      visible: true,
      x: tooltipX,
      y: tooltipY,
      text: `${completed} of ${total}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width="250" height="30" style={{ margin: "0 auto" }}>
        {data.map((item, index) => {
          const total = item.ranges[1];
          const completed = item.measures[0];
          const totalWidth = 250;
          const completedWidth =
            total > 0 ? (completed / total) * totalWidth : 0;

          return (
            <g
              key={index}
              onMouseEnter={(e) => handleMouseEnter(e, completed, total)}
              onMouseLeave={handleMouseLeave}
            >
              <rect
                x="0"
                y="10"
                width={totalWidth}
                height="15"
                fill="#E8E8E8"
                rx="10"
                ry="10"
              />
              <rect
                x="0"
                y="10"
                width={completedWidth}
                height="15"
                fill="#67DA6F"
                rx="10"
                ry="10"
              />
            </g>
          );
        })}
      </svg>
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            top: Math.max(0, tooltip.y - 40),
            left: Math.max(
              0,
              Math.min(tooltip.x - 20, window.innerWidth - 120),
            ),
            backgroundColor: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

/**
 * renderProgressBar 함수는 스케줄 리스트를 기반으로 진행 상태를 표시하는 컴포넌트를 반환합니다.
 * @param {Object[]} scheduleList - 작업 목록 배열
 * @param {boolean} scheduleList[].checked - 작업 완료 여부
 * @returns {JSX.Element} - CustomBullet 컴포넌트를 포함한 진행 상태 표시 컴포넌트
 */
const renderProgressBar = (scheduleList) => {
  const totalTasks = scheduleList.length; // 전체 작업 수
  const completedTasks = scheduleList.filter((task) => task.checked).length; // 완료된 작업 수

  const progressData = [
    {
      id: "progress",
      ranges: [0, totalTasks],
      measures: [completedTasks],
      markers: [],
    },
  ];

  return (
    <div style={{ height: "30px", width: "250px", margin: "0 auto" }}>
      <CustomBullet data={progressData} />
    </div>
  );
};

export default renderProgressBar;
