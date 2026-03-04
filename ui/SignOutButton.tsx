"use client";

import { Button } from "./button";
import { PowerIcon } from "@heroicons/react/24/solid";
import { logOut } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form
      action={logOut}
    >
      <button
        className="flex grow items-center justify-center gap-2 rounded-md text-1xl font-medium md:flex-none md:justify-start p-4"
        title="Sign-Out"
      >
          <PowerIcon className="w-6" />
          {/* <div className="hidden md:block">Sign Out</div> */}
      </button>
    </form>
  );
}


