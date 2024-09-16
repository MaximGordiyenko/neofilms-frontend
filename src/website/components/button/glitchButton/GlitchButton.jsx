import React, { useState } from 'react';
import GlitchText from 'react-glitch-effect/core/GlitchText';

export const GlitchButton = () => {
  const [isDisabled, setDisabled] = useState(false);

  const handleToggleGlitch = () => {
    setDisabled(!isDisabled);
  };
  return (
    <div>
      <GlitchText onHover={true} component="p" color1="red" color2="blue">GlitchSquiggly</GlitchText>
    </div>
  )
};