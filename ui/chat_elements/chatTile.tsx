import { FaceSmileIcon } from "@heroicons/react/24/solid"
import { bitcount } from "@/ui/fonts";
import Link from "next/link";
import { chatTileProps } from "@/lib/definitions";

export default function ChatTile(props: chatTileProps) {
  return (
    <div className="bg-graphite border-shadow-grey p-2 h-15 flex items-center drop-shadow-black hover:bg-lavender hover:text-barbie-pink hover:drop-shadow-lg transition-all duration-200">
      <FaceSmileIcon className="shrink-0 w-10"/>
      <Link
        href={`/chat/${props.chatid}`}
        className="px-3 flex flex-col overflow-hidden"
      >
        <p className={`${bitcount.className} antialiased`}>@{props.chatname}</p>
        <p className="truncate text-sm opacity-60">{props.last_message}</p>
      </Link>
      {props.unread_count !== 0 ? (
        <div className="bg-barbie-pink mr-1 min-w-6 min-h-6 rounded-full m-auto grid place-items-center place-content-center">
          <p className={`${bitcount.className} antialiased text-center text-white`}>{props.unread_count}</p>
        </div>
      ) : (<></>)
      }
      
    </div>
  );
}