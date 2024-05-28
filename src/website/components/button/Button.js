import React, { useState, useEffect } from 'react';
import './style.scss';
import clipleft from '../../assets/images/btn-clip-left.svg';
import clipright from '../../assets/images/btn-clip-right.svg';
import PropTypes from 'prop-types';
import play from '../../assets/images/play-mob.svg';
import './glitch.scss';
import bgBorder from '../../assets/images/buttonSvg.svg';
import BTN_mob from '../../assets/images/BTN_Mobile.svg';
export const Button = ({ text, style, onClick, width, isFilled, disabled }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <button className={'btn-box'} onClick={onClick} style={{ width: width }} disabled={disabled}>
      <img src={!isMobile ? bgBorder : BTN_mob} className={'button-border'} />
      {/*<img src={clipleft} alt={'btn-clip-left'} />*/}
      <div className={'btn-body'} style={style}>
        {isMobile ? (
          <span className={'button-text'}>{text}</span>
        ) : (
          <ul className="glitch" style={{ textAlign: 'center' }}>
            <li style={{ height: '100%' }}>
              <a href="#" style={{ fontSize: '13px' }}>
                {text}
              </a>
            </li>
          </ul>
        )}
        {isMobile ? <img src={play} alt={'play-icon'} className={'arr-mob'} /> : null}
      </div>
      {/*<img src={clipright} alt={'btn-clip-right'} />*/}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object, // additional styles for the button container
  onClick: PropTypes.func, // onClick handler for the button
  width: PropTypes.string, // add PropTypes for the width prop
};
