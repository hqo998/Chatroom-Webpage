import { intern } from "@/app/ui/fonts";

export default function Home() {
  return (
    <div className="flex-1 min-w-3/4 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4">
      {/* main chat */}
      <div className={`hidden md:block shrink-0 rounded-3xl bg-gray-200 ${intern.className} antialiased`}>
        <p className="text-black">friends list</p>
      </div>
      {/* list */}
      <div className={`shrink-0 rounded-3xl bg-gray-200 ${intern.className} antialiased`}>
        <p className="text-black">main chat</p>
      </div>
    </div>
  );
}
