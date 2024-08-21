import React from 'react';
import clipleft from '../../assets/images/clipleft.svg';
import clipright from '../../assets/images/clipright.svg';

export const MobButton = ({ btnText, onClick, disabled }) => {
  return (
    <div className={'filled-button-box'}>
      <img className={'clipleft'} src={clipleft} alt={'f-btn-clipleft'} />
      <button 
        className={'filled-btn-body'} 
        onClick={onClick} 
        disabled={disabled}
      >
        <span>{btnText}</span>
      </button>
      <img className={'clipright'} src={clipright} alt={'f-btn-clipright'} />
    </div>
  );
};
