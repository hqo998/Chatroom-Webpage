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
        <div className="bg-barbie-pink mr-1 w-6 h-6 aspect-square rounded-full flex items-center justify-center">
          <p className={`${bitcount.className} antialiased text-white transform -translate-y-[-1.2px] translate-x-[.5px]`}>
            {props.unread_count}
          </p>
        </div>
      ) : (<></>)
      }
      
    </div>
  );
}