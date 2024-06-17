import React, { useState } from 'react';
import './style.scss';
import {AccordionPanel} from "./AccordionPanel";

const Accordion = ({ panels }) => {
  const [activePanel, setActivePanel] = useState(null);

  const handlePanelClick = (index) => {
    setActivePanel(activePanel === index ? null : index);
  };

  return (
    <div className="accordion">
      {panels.map((panel, index) => (
        <AccordionPanel
          key={index}
          index={index}
          title={panel.title}
          content={panel.content}
          content2={panel.content2}
          content3={panel.content3}
          content4={panel.content4}
          isActive={activePanel === index}
          onPanelClick={handlePanelClick}
        />
      ))}
    </div>
  );
};

export default Accordion;
