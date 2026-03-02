import { intern } from "@/ui/fonts";
import { signOut } from "@/auth";
import { Button } from "@/ui/button";
import { PowerIcon } from "@heroicons/react/24/outline";
import SignOutButton from "@/ui/SignOutButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="flex-1 min-w-3/4 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4">
      {/* friend list*/}
      <div className={`overflow-hidden hidden md:block shrink-0 rounded-3xl bg-gray-200 ${intern.className} antialiased`}>
        <p className="text-black">friends list</p>

        {/* Signout Button */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
            }}
          >
          <SignOutButton />
        </form>
      </div>
      {/* main chat */}
      <div className={`overflow-hidden shrink-0 rounded-3xl ${intern.className} flex flex-col`}>
        {children}
      </div>
    </div>
    </>
  );
};
