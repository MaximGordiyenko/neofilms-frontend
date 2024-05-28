import React from 'react';
import './style.scss';
import arrow from '../../assets/images/accordion-arr.svg';

const AccordionPanel = ({ index, title, content, isActive, onPanelClick }) => {
  return (
    <div className={`accordion-panel ${isActive ? 'active' : ''}`}>
      <div className="panel-header" onClick={() => onPanelClick(index)}>
        <h3>{title}</h3>
        <img src={arrow} className={`arrow-icon ${isActive ? 'rotate' : ''}`} />
      </div>
      {isActive && <div className="panel-content">{content}</div>}
    </div>
  );
};

export default AccordionPanel;
