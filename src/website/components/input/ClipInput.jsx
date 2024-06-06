import './style.css';
import clipleft from '../../assets/images/clipleft.svg';
import clipright from '../../assets/images/clipright.svg';
import React from "react";
import {Flex} from "../customDiv/Flex";
export const ClipInput = ({ placeholder, onChange, value, label, name }) => {
  return (
    <Flex className="input-box-clip" flexDirection="column">
      {label && <label className="label">{label}</label>}
      <Flex className="input-layout" alignItems="center">
        <img src={clipleft} alt={'inp-clip-l'}/>
        <input
          className="input"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        <img src={clipright} alt={'inp-clip-r'}/>
      </Flex>
    </Flex>
  );
};
