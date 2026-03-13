import { chatMessageProps } from "@/lib/definitions";
import { bitcount } from "../fonts";

import clsx from 'clsx';

export default function ChatBubble(props: chatMessageProps) {
  const viewerMessage = props.senderId === props.viewerId;

  return (
    <>
    <div className={clsx(
      "rounded-2xl p-3 m-2",
      {
        'bg-cyan-500': viewerMessage === true,
        'bg-green-500': viewerMessage === false,
      },
    )}>
      <p className={`${bitcount.className} antialiased opacity-80 overflow-clip`}>
        @{props.sender}
      </p>
      <p>
        {props.message}
      </p>
    </div>
    </>
  );
}