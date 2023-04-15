import React, { useEffect, useRef } from 'react';

export default function VideoPlayer({ stream ,muted}) {
    const videoRef = useRef(null);
        useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);

    if(!stream) null
  return (
     <video
     className=' w-full h-full'
            ref={videoRef}
            autoPlay
            muted={muted}
        />
  )
}
