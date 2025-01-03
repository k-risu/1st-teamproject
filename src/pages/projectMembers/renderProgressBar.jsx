import { useState } from "react";

/**
 * CustomBullet 컴포넌트는 데이터 기반의 진행 상태를 시각적으로 표시합니다.
 * @param {Object[]} data - 진행 상태를 나타내는 데이터 배열
 * @param {number[]} data[].ranges - 전체 범위를 나타내는 값 배열 (예: [0, totalTasks])
 * @param {number[]} data[].measures - 완료된 범위를 나타내는 값 배열 (예: [completedTasks])
 * @returns {JSX.Element} - SVG 막대를 포함한 진행 상태 표시 컴포넌트
 */
const CustomBullet = ({ data }) => {
  /**
   * 상태 관리: 툴팁 표시 여부와 위치 및 텍스트
   * @property {boolean} visible - 툴팁 표시 여부
   * @property {number} x - 툴팁의 X 좌표
   * @property {number} y - 툴팁의 Y 좌표
   * @property {string} text - 툴팁에 표시할 텍스트
   */
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  /**
   * 마우스를 막대 위에 올릴 때 호출되는 함수
   * 툴팁 표시 및 위치를 업데이트합니다.
   * @param {MouseEvent} e - 마우스 이벤트
   * @param {number} completed - 완료된 작업 수
   * @param {number} total - 전체 작업 수
   */
  const handleMouseEnter = (e, completed, total) => {
    const tooltipX = e.clientX; // 마우스 X 위치 (브라우저 기준)
    const tooltipY = e.clientY; // 마우스 Y 위치 (브라우저 기준)
    setTooltip({
      visible: true,
      x: tooltipX,
      y: tooltipY,
      text: `${completed} to ${total}`, // 툴팁 텍스트
    });
  };

  /**
   * 마우스가 막대를 떠날 때 호출되는 함수
   * 툴팁을 숨깁니다.
   */
  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width="250" height="30" style={{ margin: "0 auto" }}>
        {data.map((item, index) => {
          const total = item.ranges[1]; // 전체 범위 (totalTasks)
          const completed = item.measures[0]; // 완료된 범위 (completedTasks)

          const totalWidth = 250; // 전체 막대의 너비
          const completedWidth = (completed / total) * totalWidth; // 완료된 범위의 너비

          return (
            <g key={index}>
              {/* 전체 범위 (회색 막대) */}
              <rect
                x="0"
                y="10"
                width={totalWidth}
                height="15"
                fill="#E8E8E8"
                rx="10"
                ry="10"
                onMouseEnter={(e) => handleMouseEnter(e, completed, total)}
                onMouseLeave={handleMouseLeave}
              />
              {/* 완료된 범위 (녹색 막대) */}
              <rect
                x="0"
                y="10"
                width={completedWidth}
                height="15"
                fill="#67DA6F"
                rx="10"
                ry="10"
                onMouseEnter={(e) => handleMouseEnter(e, completed, total)}
                onMouseLeave={handleMouseLeave}
              />
            </g>
          );
        })}
      </svg>

      {/* 툴팁 */}
      {tooltip.visible && (
        <div
          style={{
            position: "fixed", // 브라우저 기준 위치
            top: tooltip.y - 40, // 마우스 위에 툴팁 표시
            left: Math.min(
              tooltip.x - 20,
              window.innerWidth - 120, // 툴팁이 화면을 벗어나지 않도록 조정
            ),
            backgroundColor: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            whiteSpace: "nowrap", // 줄바꿈 방지
            pointerEvents: "none", // 툴팁 클릭 방지
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
