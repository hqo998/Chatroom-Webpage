import { chatMessageProps } from "@/lib/definitions";
import { bitcount } from "../fonts";

export default function ChatBubble(props: chatMessageProps) {

  return (
    <>
    <div className="rounded-2xl bg-cyan-500 p-5 m-2">
      <p className={`${bitcount.className} antialiased opacity-80`}>
        @{props.sender}
      </p>
      <p>
        {props.message}
      </p>
    </div>
    </>
  );
}