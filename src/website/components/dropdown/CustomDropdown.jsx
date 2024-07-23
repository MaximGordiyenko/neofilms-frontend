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
    <div className="custom-dropdown" name={name} value={value} >
      <div className={`selected-option ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {value || '50-100k'}
        <img src={dropArrow} alt={'drop-arr'} />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option.value)} name={name} value={value}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default CustomDropdown;
