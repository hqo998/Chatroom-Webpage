import Link from "next/link";
import { intern, bitcount } from "@/ui/fonts";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { auth } from "@/auth";
import SearchFriends from "@/ui/searchFriends";
import SignOutButton from "@/ui/SignOutButton";
import FriendList from "@/ui/chat_elements/friendList";



export default async function SideBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className={`hidden md:flex md:flex-col overflow-hidden min-h-0 shrink-0 rounded-2xl bg-graphite ${intern.className} antialiased drop-shadow-black drop-shadow-lg`}>
      {/* Search area */}
        <div className="flex flex-row justify-center items-center shrink-0 h-15 p-3 bg-barbie-pink">
        <SearchFriends />
        <Link 
          href="/chat/new"
          className="pl-3"
        >
          <PaperAirplaneIcon className="w-8" />
        </Link>
      </div>

      {/* scrollable area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <FriendList />
      </div>

      {/* action buttons */}
      <div className="flex shrink-0 w-full h-15 justify-center items-center gap-4 bg-barbie-pink"> 
        <div className="m-[auto+5] rounded-2xl transition-colors hover:bg-hot-rose">
          <SignOutButton />
        </div>

        <div className={`flex-1 justify-center items-center ${bitcount.className} antialiased`}>
          <p>{user?.name ? `@${user.name}` : '@Guest'}</p>
        </div>
      </div>

    </div>
  );
}