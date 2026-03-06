import { FaceSmileIcon } from "@heroicons/react/24/solid"
import { bitcount } from "@/ui/fonts";

export default function ChatTile(props: { chatid?: string, chatname?: string, last_message?: string }) {
  return (
    <div className="bg-graphite border-shadow-grey p-2 h-15 flex  items-center drop-shadow-black hover:bg-lavender hover:text-barbie-pink hover:drop-shadow-lg transition-all duration-200">
      <FaceSmileIcon className="shrink-0 w-10"/>
      <div className="px-3 flex flex-col overflow-hidden">
        <p className={`${bitcount.className} antialiased`}>@{props.chatname}</p>
        <p className="truncate text-sm opacity-60">{props.last_message}</p>
      </div>
    </div>
  );
}