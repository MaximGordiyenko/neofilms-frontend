import React from 'react';
import ReactPlayer from 'react-player';

const VideoBackground = ({ videoUrl }) => {
  return (
    <div className="video-background">
      <ReactPlayer
        url={videoUrl}
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default VideoBackground;
