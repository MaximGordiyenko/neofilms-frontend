import React, { useEffect, useRef } from 'react';
import videoBg from '../../../assets/images/HeroVid10 (1).mp4';

const AutoplayVideoComponent = () => {
  const videoParentRef = useRef();
  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') > -1 && ua.indexOf('chrome') < 0;
  };
  useEffect(() => {
    if (isSafari() && videoParentRef.current.children[0]) {
      const player = videoParentRef.current.children[0];
      if (player) {
        player.controls = false;
        player.playsinline = false;
        player.muted = true;
        player.setAttribute('muted', '');
        player.autoPlay = true;
      }
      setTimeout(() => {
        const promise = player.play();
      });
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
    <video playsinline autoplay loop muted>
        <source src={videoBg} type="video/mp4"/>
    </video>`,
      }}
    />
  );
};

export default AutoplayVideoComponent;
