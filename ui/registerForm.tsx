import Link from "next/link";
import { tryRegister } from "@/lib/actions";
import { Button } from "@/ui/button";


export function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <form
          action={tryRegister}
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

        {/* confirm password */}
        <label
          htmlFor="password"
        >
           Comfirm Password
        </label>
        <input
          name="password"
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
      </form>
    </div>
  );
}