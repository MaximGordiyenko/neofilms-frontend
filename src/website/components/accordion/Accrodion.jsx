import React, { useState } from 'react';
import AccordionPanel from './AccordionPanel';
import './style.scss';

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
          isActive={activePanel === index}
          onPanelClick={handlePanelClick}
        />
      ))}
    </div>
  );
};

export default Accordion;
