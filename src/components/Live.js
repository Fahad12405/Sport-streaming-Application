import React from 'react';
import VideoPlayer from './videoPlayer.js';

const Live = () => {
  // HLS streaming link
  const hlsStreamUrl = 'https://watchout-usea.streaming.media.azure.net/163277cd-86d5-4af5-85f9-1a7bba200837/ddbcef4a-bdda-47ce-8415-1eb1dcbef1fe.ism/manifest(format=m3u8-cmaf)';

  return (
    <div>
      <VideoPlayer src={hlsStreamUrl} />
    </div>
  );
};

export default Live;

