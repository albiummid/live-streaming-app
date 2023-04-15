import { StreamPrivacyTypes, StreamStatus, StreamTypes } from '@/constants/variables';
import { useCreateStreamMutation } from '@/redux/features/stream/streamAPI';
import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CreateRoom() {

    const [createStreamRoom,{data:resCreateRoom}] = useCreateStreamMutation();
    const router = useRouter();
    const {roomType} = router.query;
    const form = useForm({
        initialValues:{
            title:'',
            streamType:"",
            streamPrivacyType:"",
            seats:0,
            coverImage:null,
            status:StreamStatus.Ongoing
        },
        validate:{
            title:(value) => !value && "Required !",
            streamType:(value) => !value && "Required !",
            streamPrivacyType:(value) => !value && "Required !",
            seats:(value) => value <= 0 && "Required !",
            coverImage:(value) => !value && "Required !",
            status:(value) => !value && "Required !",
        }
    })

    useEffect(()=>{
        if(resCreateRoom){
            router.push('/room/'+resCreateRoom.data.streamRoom._id)
        }
    },[resCreateRoom])

    // const FormField = ({
    //     placeholder,
    //     label,
    //     data,
    //     keyIndex,
    //     variant,
    //     form,
    //     className="",
    // })=>{
    //     if(variant == 'text-input'){
    //         return <TextInput className={className}  placeholder={placeholder} label={label} {...form.getInputProps(keyIndex)} />
    //     }
    //     if(variant == 'number-input'){
    //         return <NumberInput className={className}  placeholder={placeholder} label={label} {...form.getInputProps(keyIndex)}  />
    //     }

    //     if(variant == 'select'){
    //         return <Select className={className}  placeholder={placeholder} label={label} data={data} {...form.getInputProps(keyIndex)}  />
    //     }
    //     if(variant == 'file-input'){
    //         return <FileInput  className={className} placeholder={placeholder} label={label} data={data} {...form.getInputProps(keyIndex)}/>
    //     }
    // }

    // const formFields = [
    //     {
    //         label:"Title",
    //         placeholder:"Enter a title of the live ",
    //         keyIndex:'title',
    //         variant:'text-input',
    //         form
    //     },{
    //         label:"Stream Type",
    //         placeholder:"Choose Stream Type",
    //         keyIndex:'streamType',
    //         variant:'select',
    //         data:[
    //             {
    //                 label:"Live",
    //                 value:StreamTypes.SingleStream
    //             },
    //             {
    //                 label:"Multi Live",
    //                 value:StreamTypes.MultiStream,
    //             },{
    //                 label:"Audio Live",
    //                 value:StreamTypes.AudioStream
    //             }
    //         ],
    //         form

    //     },{
    //         label:"Stream Privacy Type",
    //         placeholder:"Choose Stream Privacy Type",
    //         keyIndex:'streamPrivacyType',
    //         variant:'select',
    //         data:[
    //             {
    //                 label:"Public",
    //                 value:StreamPrivacyTypes.Public
    //             },
    //             {
    //                 label:"Private",
    //                 value:StreamPrivacyTypes.Private,
    //             }
    //         ]
    //     },
    //     {
    //         label:"Seats Count",
    //         keyIndex:'seats',
    //         placeholder:"Enter the number of seats",
    //         variant:"number-input",
    //     },{
    //         label:"Cover Image",
    //         keyIndex:"coverImage",
    //         placeholder:"Choose cover image",
    //         variant:"file-input",

    //     }
    // ]


  return (
    <form className='p-5 w-full flex flex-col gap-2 h-full' onSubmit={form.onSubmit(values=>createStreamRoom(values))}>
        {/* {
            formFields.map((x,key)=><FormField {...x} key={key} form={form}/>)
        } */}

        <TextInput label="Title" placeholder='Enter a title of the live' {...form.getInputProps('title')}/>
        <Select label="Stream Type"   placeholder='Choose Stream Type'  data={[
                {
                    label:"Live",
                    value:StreamTypes.SingleStream
                },
                {
                    label:"Multi Live",
                    value:StreamTypes.MultiStream,
                },{
                    label:"Audio Live",
                    value:StreamTypes.AudioStream
                }
            ]}  {...form.getInputProps('streamType')}
            />
            <NumberInput label="Seat count"  placeholder='Enter number of seats' {...form.getInputProps('seats')}/>
        <Select label="Stream Privacy Type"  placeholder='Choose Stream Privacy Type'  data={[
                {
                    label:"Public",
                    value:StreamPrivacyTypes.Public
                },
                {
                    label:"Private",
                    value:StreamPrivacyTypes.Private,
                }
            ]}  {...form.getInputProps("streamPrivacyType")}
            />

            <Button onClick={()=>{
                createStreamRoom(form.values);
            }} type='submit' className='mt-10'>
                Go Live
            </Button>

    </form>
  );
}
