import React, { useEffect, useRef } from 'react'

export default function AudioPlayer({ stream,muted }) {
    const videoRef = useRef(null);
        useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);

  return (
     <audio
     className=' w-full h-full'
            ref={videoRef}
            autoPlay
            muted={muted}
        />
  )
}
