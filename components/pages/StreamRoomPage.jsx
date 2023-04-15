import useWebRTC from '@/hooks/useWebRTC';
import { useAuthState } from '@/redux/features/auth/authSlice';
import { useGetStreamQuery } from '@/redux/features/stream/streamAPI';
import { peer } from '@/utils/PeerInstance';
import socket from '@/utils/Socket';
import { Affix, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import VideoPlayer from '../ui/VideoPlayer';

export default function StreamRoom() {
    const router = useRouter();

    const {roomId} = router.query
    const {data:roomData} = useGetStreamQuery(roomId,{
        skip:!roomId
    });
    const {user} = useAuthState();

    const {getLocalMediaStream,localMediaStream} = useWebRTC();
    const isHost = useMemo(()=>user?._id === roomData?.createdBy,[user,roomData]);

    const streamConfigs = ()=>{
      if(isHost){
        return {
          audio:true,
          video:true,
        }
      }else{
       return {audio:true,
        video:true}
      }
    }

    const [peerId, setPeerId] = useState("");
    const [joined,setJoined] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const [localUserStream, setLocalUserStream] = useState(null);
    const [callList,setCallList] = useState([])
    const [answerList,setAnswerList] = useState([])

    

 
  
    useEffect(() => {
      getLocalMediaStream();
    }, []);

    useEffect(()=>{
      peer.once("open", (id) => {
        setPeerId(id);
        toast.success(`You are connected with server !`)
        if(roomId && user){
          socket.emit("join-room", {
            roomId,
            userId: user?._id,
            peerId:id,
          });
        }
      });

      peer.on("call", async (call) => {
        try {
          // Checking , is the call already received ?
          if (remoteStreams.find((x) => x.peerId == call.peer)) {
            return toast.error("already answered");
          }

          global.navigator.mediaDevices
          .getUserMedia(streamConfigs())
          .then((mediaStream) => {
            call.answer(mediaStream);
            // Sending my stream to remoteUser
            call.on("stream", function (remoteStream) {
              let remotePeerId = call.peer;
              setRemoteStreams((prv) =>
                prv
                  .filter((x) => x.peerId !== call.peer)
                  .concat({
                    peerId: remotePeerId,
                    stream: remoteStream,
                  })
              );
            });
          })
        

          call.on('close',()=>{
            console.log(`peerID:${call.peer} is disconnected !`)
            let streams = remoteStreams;
            setRemoteStreams([]);
            setRemoteStreams(prv=>streams.filter(x=>x.peerId !== call.peer));
          })

        } catch (err) {
          console.log(err, "error..");
        }
      });
        return ()=>{
          peer.off('open')
          peer.off('call')
        }
    },[roomId,user,localMediaStream])

    async function call({ remotePeerId, remoteSocketId, user }) {
        try {
          // Checking is I already called the user?
          if (remoteStreams.find((x) => x.peerId == remotePeerId)) {
            return toast.error("already called !");
          }
    
          global.navigator.mediaDevices
            .getUserMedia(streamConfigs())
            .then((mediaStream) => {
              // calling the user
              const call = peer.call(remotePeerId, mediaStream)
              
              call.on('stream',(remoteStream) => 
              {
                console.log("<<<<>>>> REMOTE STREAM >>",remoteStream)
                let remotePeerId = call.peer;
                setRemoteStreams((prv) => {
                  return prv
                    .filter((x) => x.peerId !== remotePeerId)
                    .concat({
                      peerId: remotePeerId,
                      stream: remoteStream,
                      socketId: remoteSocketId,
                      user,
                    });
                });
              });
    
              // call.on("stream", );

              call.on('close',()=>{
                console.log(`peerID:${remotePeerId} is disconnected !`)
                let streams = remoteStreams;
                setRemoteStreams([]);
                setRemoteStreams(prv=>streams.filter(x=>x.peerId !== remotePeerId));
              })
            });

  
        } catch (err) {
          console.log(err, "error");
        }
      }
    

    useEffect(() => {
     
      return () => {
        socket.on(`user-joined-at-${roomId}`, (payload) => {
          toast.success("A user joined !");
          if (payload.data.success) {
            if (payload.data.peerId != peerId) {
              call({
                remotePeerId: payload.data.peerId,
                remoteSocketId: payload.data.socketId,
                user: payload.data.user,
              });
            }
          } else {
            console.log(payload, "payload error... >");
          }
        });
    
        socket.on(`user-disconnected-from-${roomId}`, (payload) => {
          // setRemoteStreams(prv=>prv.filter(x=>x.socketId !== payload.data.socketId))
          setRemoteStreams([]);
        });
      };
    }, [roomId, peerId]);

    
  return (
    <main >
        <section id='videos' className=" grid grid-cols-1 gap-5 place-items-center w-full">
        <div>
         {
          isHost &&  <VideoPlayer stream={localMediaStream} />
         }
        </div>
       {!isHost &&  <>
        {remoteStreams?.map((x) => {
          return (
            <div key={x.peerId}>
              <VideoPlayer stream={x.stream} />
              <p>{x.user?.name}</p>
            </div>
          );
        })}
       </>}
      </section>

      <Affix className='w-full' bottom={0}>
        <TextInput className=" w-full"/>
      </Affix>
    </main>
  );
}
