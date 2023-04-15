import { useGetStreamsQuery } from "@/redux/features/stream/streamAPI";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      streamType: "",
      streamVisibility: "",
      seats: 2,
      status: "ONGOING",
    },
  });

  const { data: streamRoomsRes } = useGetStreamsQuery({
    limit: 100,
  });

  return (
    <div className=" p-10">
      {/* <Button onClick={() => setOpen(true)}>Create Room</Button> */}

      <div className=" justify-center  items-center flex">
        <section className=" grid grid-cols-2 gap-5 w-fit p-10 ">
          {streamRoomsRes?.streamRooms?.map((x, idx) => (
            <StreamCard {...x} key={x._id} idx={idx} />
          ))}
        </section>
      </div>

      {/* <Modal opened={open} onClose={() => setOpen(false)}>
        <TextInput label="Title" {...form.getInputProps("title")} />
        <Select />
      </Modal> */}
    </div>
  );
}

const StreamCard = ({ _id, idx }) => {
  return (
    <Link href={"/room/" + _id}>
      <div className=" relative rounded-lg">
        <p className=" absolute left-1 bottom-1 text-white p-1 text-xs rounded-lg bg-[rgba(0,0,0,0.4)]">
          {idx + 1} Lobby
        </p>
        <img
          className="h-20 rounded-lg"
          src={
            "https://i.pcmag.com/imagery/articles/013ENjWY1RE0zxl9EqAwzDF-31.fit_lim.size_1600x900.v1668188581.jpg"
          }
          alt=""
        />
      </div>
    </Link>
  );
};
