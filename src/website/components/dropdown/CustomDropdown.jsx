import React, { useState } from 'react';
import './style.scss';
import dropArrow from '../../assets/images/arrow-dropdown.svg';

const CustomDropdown = ({ options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className={`selected-option ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {value || '50-100k'}
        <img src={dropArrow} alt={'drop-arr'} />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
