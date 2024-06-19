import React from 'react';
import './style.scss';
import arrow from '../../assets/images/accordion-arr.svg';
import {useSpring, animated} from "react-spring";

export const AccordionPanel = ({ index, title, content, content2, content3, content4,isActive, onPanelClick }) => {
  const springProps = useSpring({
    maxHeight: isActive ? '1000px' : '0',
    opacity: isActive ? 1 : 0,
  });
  return (
    <div className={`accordion-panel ${isActive ? 'active' : ''}`}>
      <div className="panel-header" onClick={() => onPanelClick(index)}>
        <h3>{title}</h3>
        <img src={arrow} className={`arrow-icon ${isActive ? 'rotate' : ''}`} />
      </div>
      {isActive && (
        <animated.div className={`panel-content ${isActive ? 'active' : ''}`} style={springProps}>
          <div className="content-text">{content}</div>
          {content2 && <li className="content-text">{content2}</li>}
          {content3 && <li className="content-text">{content3}</li>}
          {content4 && <li className="content-text">{content4}</li>}
        </animated.div>
      )}
    </div>
  );
};
