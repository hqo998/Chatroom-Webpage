import { intern, bitcount } from "@/ui/fonts";
import SideBar from "@/ui/sideBar";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex-1 min-h-0 min-w-0 w-full max-w-250 grid grid-rows-1 md:grid-cols-[250px_1fr] gap-4">
      <SideBar />

      {/* main chat */}
      <div className={`flex flex-col overflow-hidden min-h-0 shrink-0 rounded-2xl ${intern.className} antialiased drop-shadow-black drop-shadow-lg`}>
        {children}
      </div>
      
    </div>
  );
}