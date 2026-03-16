import { chatMessageProps } from "@/lib/definitions";
import { bitcount } from "../fonts";

import clsx from 'clsx';

export default function ChatBubble(props: chatMessageProps) {
  const viewersMessage = props.senderId === props.viewerId;

  return (
    <div className={clsx(
      "flex flex-1 min-w-0 w-full",
      {
        'justify-end': viewersMessage === true,
        'justify-start': viewersMessage === false,
      },
    )}>
      <div className={clsx(
        "rounded-2xl p-3 m-2 overflow-clip",
        {
          'bg-cyan-500': viewersMessage === true,
          'bg-green-500': viewersMessage === false,
        },
      )}>
        <p className={`${bitcount.className} antialiased opacity-80 overflow-clip`}>
          @{props.sender}
        </p>
        <p>
          {props.message}
        </p>
      </div>
    </div>
  );
}