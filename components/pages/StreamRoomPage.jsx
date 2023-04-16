import useWebRTC from '@/hooks/useWebRTC';
import { useAuthState } from '@/redux/features/auth/authSlice';
import { useGetStreamQuery } from '@/redux/features/stream/streamAPI';
import { peer } from '@/utils/PeerInstance';
import socket from '@/utils/Socket';
import { Affix, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineSend } from 'react-icons/ai';
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
    const [messageField,setMessageField] = useState('');
    const [messages,setMessages] = useState([]);
    const bottomRef = useRef(null);


    

 
  
    useEffect(() => {
     if(isHost){
      getLocalMediaStream();
     }
    }, [isHost]);

    useEffect(()=>{
      function initPeer (){
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
      }
        return initPeer()
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
    
const messageScrollToBottom = (id)=>{
  setTimeout(()=>{
    let el = document.getElementById(id)
    el?.scrollIntoView({behavior: 'smooth', top:100})
  },10)
}


    useEffect(() => {
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
        setRemoteStreams([]);
      });

      socket.on(`streamRoom-${roomId}/message`,(payload)=>{
        setMessages(prv=>prv.concat(payload.data.message))
        console.log(payload.data.message.sentBy?._id)
        if(payload.data.message.sentBy?._id === user?._id){
          setMessageField("")
        }

        messageScrollToBottom(payload.data.message._id);
      })
      return () => {
        socket.off(`streamRoom-${roomId}/message`)
        socket.off(`user-disconnected-from-${roomId}`)
        socket.off(`user-joined-at-${roomId}`)
      };
    }, [roomId, peerId,user]);

    const handleSendMessage = ()=>{
      if(!messageField.length) return
      socket.emit('streamRoom/message',{
        roomId,
        userId:user?._id,
        body:messageField,
        kind:'Text'
      })
    }

    const MessageContainer = ({body,kind,sentBy,_id})=>{
      const ownMessage = sentBy._id === user._id;
      if(kind === 'Text'){
        return <div id={_id} className={`my-2  w-fit ${ownMessage?'ml-auto':''}`}>
         {
          ownMessage? <small className=' text-right '>
        </small>: <small className='text-[10px] pl-1'>
            {sentBy.name}
          </small>
         }
          <p className={`border rounded-lg w-fit p-2 text-xs ${ownMessage ? 'bg-slate-400/20':'bg-red-400/20'}`}>{body}</p>
        </div>
      }
    }

    
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
        <div className='w-full max-h-[20vh] overflow-y-scroll px-5'> 
          {
            messages?.map(x=><MessageContainer {...x} key={x._id}/>)
          }
        </div>
        <TextInput   onKeyPress={(e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }} value={messageField} onChange={(e)=>setMessageField(e.currentTarget.value)} className=" w-full" rightSection={<AiOutlineSend className=' cursor-pointer' onClick={handleSendMessage}/>}/>
      </Affix>
    </main>
  );
}
