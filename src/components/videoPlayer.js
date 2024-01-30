import React, { useRef, useEffect } from 'react';
// import styled from 'styled-components';
import videojs from 'video.js';
// import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  let player = null;

  useEffect(() => {
    // Initialize video.js player
    player = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      sources: [{
        src,
        type: 'application/x-mpegURL'
      }]
    });

    return () => {
      // Cleanup on unmount
      if (player) {
        player.dispose();
      }
    };
  }, [src]);

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{width: "1100px", height: "96vh"}} data-vjs-player>
        <video   ref={videoRef} className="video-js vjs-default-skin" />
      </div>
    </div>
  );
};


export default VideoPlayer;