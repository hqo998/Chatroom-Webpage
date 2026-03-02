import { intern } from "@/ui/fonts";
import { signOut } from "@/auth";
import { Button } from "@/ui/button";
import { ArchiveBoxIcon, PowerIcon } from "@heroicons/react/24/outline";
import SignOutButton from "@/ui/SignOutButton";


export default function Home() {
  return (
    <>
    <div className="flex-1 flex items-center justify-center overflow-y-auto bg-gray-700 ">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/3">
        <ArchiveBoxIcon className=""/>
        <p className="text-center text-2xl">Your messages</p>
        <p className="text-center opacity-60 p-2">Choose a chat to start.</p>
      </div>
      
    </div>
    </>
  );
}
