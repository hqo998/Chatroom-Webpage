import { chatMessageProps } from "@/lib/definitions";

export default function ChatBubble(props: chatMessageProps) {

  return (
    <div className="rounded-2xl">
      <p>{props.sender}</p>
      <p>{props.message}</p>
    </div>
  );
}