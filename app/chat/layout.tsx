import { intern } from "@/ui/fonts";
import SignOutButton from "@/ui/SignOutButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="flex-1 min-w-3/4 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4">
      {/* friend list*/}
      <div className={`w-full h-full overflow-hidden hidden md:flex shrink-0 rounded-3xl bg-gray-200 ${intern.className} antialiased`}>
        <div className="flex-1 grid grid-cols-1 grid-rows-[1fr_60px]">
          <p className="text-black">friends list component goes here</p>

          <div className="flex w-full h-full justify-left items-center bg-amber-500"> {/* action buttons */}
            {/* Signout Button */}
            <div className="h-full shrink hover:bg-amber-700">
              <SignOutButton />
            </div>
          </div>
        </div>



      </div>
      {/* main chat */}
      <div className={`overflow-hidden shrink-0 rounded-3xl ${intern.className} flex flex-col`}>
        {children}
      </div>
    </div>
    </>
  );
};
