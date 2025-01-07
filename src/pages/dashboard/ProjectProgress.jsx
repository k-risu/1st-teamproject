import PropTypes from "prop-types";

const ProjectProgress = ({ title, progress }) => {
  const getColor = (progress) => {
    if (progress < 50) return "#ff775f"; // 빨간색
    if (progress < 80) return "#ffe343"; // 노란색
    return "#67da6f"; // 초록색
  };

  const containerStyles = {
    marginBottom: "20px",
  };

  const barContainerStyles = {
    height: "20px",
    width: "70%",
    backgroundColor: "#e0e0df",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: getColor(progress),
    transition: "width 0.5s ease-in-out",
  };

  const labelStyles = {
    padding: "0 10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    lineHeight: "20px",
  };

  const titleStyles = {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "600",
  };

  return (
    <div style={containerStyles}>
      <div style={titleStyles}>{title}</div>
      <div style={barContainerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${progress}%`}</span>
        </div>
      </div>
    </div>
  );
};

ProjectProgress.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

const ProgressBar = ({ teamProgress, personalProgress }) => {
  return (
    <div>
      <ProjectProgress title="팀 진행률" progress={teamProgress} />
      <ProjectProgress title="개인 진행률" progress={personalProgress} />
    </div>
  );
};

ProgressBar.propTypes = {
  teamProgress: PropTypes.number.isRequired,
  personalProgress: PropTypes.number.isRequired,
};

export default ProgressBar;
