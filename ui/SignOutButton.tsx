"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SignOutButton() {
  return (
    <Button>
      <div className="flex grow items-center justify-center gap-2 rounded-md text-1xl font-medium md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </div>
    </Button>
  );
}
