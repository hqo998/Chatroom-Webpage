"use client";

import Link from "next/link";
import { tryRegister } from "@/lib/actions";
import { Button } from "@/ui/button";
import { useActionState } from "react";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';


export function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState(
      tryRegister,
      undefined,
    );

    
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <form
          action={formAction}
          className="min-w-1/3 flex flex-col gap-2 mb-50"
      >
        <div
        className=""
        >
          <h1
            className="text-5xl"
          >
            Register</h1>
        </div>
        
        {/* username */}
        <label
          htmlFor="username"
        >
          Username
        </label>
        <input
          name="username"
          placeholder="username"
          className="p-2 bg-gray-300 border-gray-200 rounded-md text-sm outline-2 placeholder:text-gray-500 text-black "
        />
  

        {/* password */}
        <label
          htmlFor="password"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="password"
          className="p-2 bg-gray-300 border-gray-200 rounded-md text-sm outline-2 placeholder:text-gray-500 text-black"
        />

        {/* confirm passwond */}
        <label htmlFor="confirm_password">
           Confirm Password
        </label>
        <input
          name="confirm_password"
          type="password"
          placeholder="password"
          className="p-2 bg-gray-300 border-gray-200 rounded-md text-sm outline-2 placeholder:text-gray-500 text-black"
        />
        

        {/* login button */}
        <div
        className="flex items-center justify-center gap-4 mt-4"
        >
          <Link
            href="/login"
            className="bg-gray-600 hover:bg-gray-500 py-5 px-6 rounded-2xl w-fit justify-center items-center"
          >
            <span> Back to Login</span>
          </Link>

          <Button type="submit">
            <span>Register</span>
          </Button>
        </div>
        {errorMessage && (
            <div className="flex flex-row justify-center items-center">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" /><p className="pl-2 text-sm text-red-500">{errorMessage}</p>
            </div>
          )}

      </form>
    </div>
  );
}