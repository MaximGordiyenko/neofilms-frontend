import React, { useState } from 'react';
import imgCheck from '../../assets/images/Vector 227.svg';

const Checkbox = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <div
      className={`checkbox ${isChecked ? 'selected' : ''}`}
      onClick={handleToggle}
      style={{ userSelect: 'none' }}>
      {isChecked && <img alt="" src={imgCheck} />}
    </div>
  );
};

export default Checkbox;
