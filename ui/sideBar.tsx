import { intern, bitcount } from "@/ui/fonts";
import SignOutButton from "@/ui/SignOutButton";
import FriendList from "@/ui/chat_elements/friendList";
import FriendsHeader from "./friendsHeader";
import { Suspense } from "react";

export default function SideBar({ user }: { user: any }) {
  return (
    <div className={`hidden md:flex md:flex-col overflow-hidden min-h-0 shrink-0 rounded-2xl bg-graphite ${intern.className} antialiased drop-shadow-black drop-shadow-lg`}>
      {/* Search area */}
      <Suspense>
        <FriendsHeader />
      </Suspense>
      

      {/* scrollable area */}
      <div className="flex-1 overflow-y-auto min-h-0">
      <Suspense>
        <FriendList />
      </Suspense>
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