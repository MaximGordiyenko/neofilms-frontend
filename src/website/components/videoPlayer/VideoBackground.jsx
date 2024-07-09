import React from 'react';
import Plyr from 'react-plyr';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <Plyr
      type="video"
      url={videoUrl}
      autoplay
      controls
      style={{ width: '1501px', height: '776px' }}
    />
  );
};

export default VideoPlayer;
