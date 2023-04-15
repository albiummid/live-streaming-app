import { Affix } from '@mantine/core';

export default function BottomBar({children}) {

  return (
     <Affix bottom={0} className='flex w-full bg-gray-400 justify-center gap-2 items-center p-2 text-sm'>
       {children}
    </Affix>
  );
}
