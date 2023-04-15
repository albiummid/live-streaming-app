import dynamic from 'next/dynamic';
const StreamRoomPage = dynamic(()=>import('@/components/pages/StreamRoomPage'),{
  ssr:false
})
export default function componentName() {
  return (
    <>
    <StreamRoomPage/>
    </>
  );
}
