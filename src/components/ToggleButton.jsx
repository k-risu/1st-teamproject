import { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ToggleButton = ({
  leftLabel = "대시보드",
  rightLabel = "구성원",
  activeButton,
  onLeftClick,
  onRightClick,
}) => {
  const ToggleButton = styled.div`
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    width: 200px; /* 원하는 버튼 그룹의 너비 */

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .toggle-button {
      flex: 1;
      padding: 8px 15px;
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      background-color: rgba(255, 255, 255, 1);
      border: none;
      outline: none;
      cursor: pointer;
      transition:
        background-color 0.3s,
        color 0.3s,
        box-shadow 0.3s;
    }

    .toggle-button.active {
      background-color: white;
      color: black;
      box-shadow: inset 0 -3px 0 0 #333;
    }

    .toggle-button:not(.active):hover {
      background-color: #f1f1f1;
    }
  `;

  return (
    <ToggleButton>
      <button
        className={`toggle-button ${activeButton === "left" ? "active" : ""}`}
        onClick={onLeftClick}
      >
        {leftLabel}
      </button>
      <button
        className={`toggle-button ${activeButton === "right" ? "active" : ""}`}
        onClick={onRightClick}
      >
        {rightLabel}
      </button>
    </ToggleButton>
  );
};

ToggleButton.propTypes = {
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  activeButton: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
};

export default ToggleButton;
