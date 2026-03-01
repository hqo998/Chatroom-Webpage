import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-1 w-full">
      <form>
        <Link
          href="/login"
          className="bg-cyan-600 hover:bg-cyan-500 p-5 px-10 rounded-2xl"
        >
          <span>Login</span>
        </Link>
      </form>
    </div>
  );
}