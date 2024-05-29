import React from 'react';
import './style.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-indicator" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
