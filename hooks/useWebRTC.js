import { useEffect, useState } from "react";

export default function useWebRTC() {
  const [localMediaStream, setLocalMediaStream] = useState(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    setMuted(!localMediaStream?.getAudioTracks()[0].enabled);
    setCameraOff(!localMediaStream?.getVideoTracks()[0].enabled);
  }, [localMediaStream]);

  const cameraToggle = () => {
    const toggled = !localMediaStream?.getVideoTracks()[0].enabled;
    localMediaStream?.getVideoTracks()[0].enabled = toggled;
  };

  const micToggle = () => {
    const toggled = !localMediaStream?.getAudioTracks()[0].enabled;
    localMediaStream?.getAudioTracks()[0].enabled = toggled;
  };

  const stopMediaStream = () => {
    localMediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    setLocalMediaStream(null);
  };

  function getLocalMediaStream() {
    global.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setLocalMediaStream(mediaStream);
      });
  }

  return {
    localMediaStream,
    setLocalMediaStream,
    muted,
    cameraOff,
    cameraToggle,
    micToggle,
    getLocalMediaStream
  };
}
