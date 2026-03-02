'use client';

import Link from "next/link";
import { tryLogin } from "@/lib/actions";
import { Button } from "@/ui/button";
import { useActionState } from 'react';
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/chat';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );


  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <form
        action={(form_data) => {
          if (!form_data.get("username")?.toString().trim()) return;
          if (!form_data.get("password")?.toString()) return;
          formAction(form_data);
        }}
        className="min-w-1/3 flex flex-col gap-2 mb-50"
      >
        <div className="">
          <h1 className="text-5xl">
            Login
          </h1>
        </div>

        {/* username */}
        <label htmlFor="username">
          Username
        </label>
        <input
          name="username"
          placeholder="username"
          className="p-2 bg-gray-300 border-gray-200 rounded-md text-sm outline-2 placeholder:text-gray-500 text-black "
        />


        {/* password */}
        <label htmlFor="password">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="password"
          className="p-2 bg-gray-300 border-gray-200 rounded-md text-sm outline-2 placeholder:text-gray-500 text-black"
        />


        {/* login / register button */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link
            href="/register"
            className="bg-gray-600 hover:bg-gray-500 py-5 px-6 rounded-2xl w-fit justify-center items-center"
          >
            <span>Register</span>
          </Link>

          <input type="hidden" name="redirectTo" value={callbackUrl} /> {/* track where they came from to send em back */}

          <Button type="submit">
            <span>Login</span>
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
};