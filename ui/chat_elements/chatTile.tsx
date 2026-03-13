import { FaceSmileIcon } from "@heroicons/react/24/solid"
import { bitcount } from "@/ui/fonts";
import Link from "next/link";
import { friendListItem } from "@/lib/definitions";

export default function ChatTile(props: friendListItem) {
  return (
    <div className="bg-graphite border-shadow-grey p-2 h-15 flex items-center justify-between drop-shadow-black hover:bg-lavender hover:text-barbie-pink hover:drop-shadow-lg transition-all duration-200">
      <div className="flex-1 min-w-0 items-center flex flex-row">
        <FaceSmileIcon className="shrink-0 w-10"/>
        <Link
          href={`/chat/${props.chatid}`}
          className="px-3 flex flex-col flex-1 min-w-0 overflow-hidden"
        >
          <p className={`${bitcount.className} antialiased`}>@{props.chatname}</p>
          <p className="truncate text-sm opacity-60">{props.last_message}</p>
        </Link>
      </div>
      {props.unread_count !== 0 ? (
        <div className="bg-barbie-pink mr-1 w-6 h-6 aspect-square rounded-full flex items-center justify-center">
          <p className={`${bitcount.className} antialiased text-white transform -translate-y-[-1.2px] translate-x-[.5px]`}>
            {props.unread_count < 99 ? props.unread_count : "99"}
          </p>
        </div>
      ) : (<></>)
      }
    </div>
  );
}