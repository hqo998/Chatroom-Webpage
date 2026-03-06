import { auth } from "@/auth";
import FriendList from "@/ui/chat_elements/friendList";
import { intern, bitcount } from "@/ui/fonts";
import SignOutButton from "@/ui/SignOutButton";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex-1 min-h-0 min-w-3/4 grid grid-rows-1 md:grid-cols-[250px_1fr] gap-4">
      
      {/* friend list */}
      <div className={`hidden md:flex md:flex-col overflow-hidden min-h-0 shrink-0 rounded-2xl bg-graphite ${intern.className} antialiased drop-shadow-black drop-shadow-lg`}>
        
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

      {/* main chat */}
      <div className={`flex flex-col overflow-hidden min-h-0 shrink-0 rounded-2xl ${intern.className} antialiased drop-shadow-black drop-shadow-lg`}>
        {children}
      </div>
      
    </div>
  );
}