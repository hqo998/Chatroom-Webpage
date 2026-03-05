"use client";

import { Button } from "./button";
import { PowerIcon } from "@heroicons/react/24/solid";
import { logOut } from "@/lib/actions";

export default function SignOutButton() {
  return (
    
      <button
        className="flex-1 flex items-center justify-center rounded-md text-1xl font-medium md:flex-none md:justify-start p-2"
        title="Sign-Out"
        onClick={logOut}
      >
          <PowerIcon className="w-7" />
          {/* <div className="hidden md:block">Sign Out</div> */}
      </button>
    
  );
}


