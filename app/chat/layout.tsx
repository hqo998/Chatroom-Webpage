import { auth } from "@/auth";
import FriendList from "@/ui/chat_elements/friendList";
import { intern, bitcount } from "@/ui/fonts";
import SignOutButton from "@/ui/SignOutButton";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  return (
    <>
    <div className="flex-1 min-w-3/4 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4">
      {/* friend list*/}
      <div className={`w-full h-full overflow-hidden hidden md:flex shrink-0 rounded-2xl bg-graphite ${intern.className} antialiased`}>
        <div className="flex-1 grid grid-cols-1 grid-rows-[1fr_60px] ">
          {/* <p className="text-lavender ">friends list component goes here</p> */}
          <div className="flex flex-col overflow-y-auto">
            <FriendList />
          </div>

          <div className="flex w-full h-full justify-center items-center gap-4 bg-barbie-pink"> {/* action buttons */}
            {/* Signout Button - fixed square and centered */}
            <div className="flex items-center justify-center rounded-2xl m-2 transition-colors hover:bg-hot-rose">
              <SignOutButton />
            </div>

            <div className={`flex-1 justify-center items-center ${bitcount.className} antialiased`}>
              <p>{ `@${user?.name}` || 'Guest'}</p>
            </div>
          </div>
        </div>



      </div>
      {/* main chat */}
      <div className={`overflow-hidden shrink-0 rounded-2xl ${intern.className} flex flex-col`}>
        {children}
      </div>
    </div>
    </>
  );
};
