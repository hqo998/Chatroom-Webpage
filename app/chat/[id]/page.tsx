import { intern } from "@/ui/fonts";

export default function Home() {
  return (
    <>
    <div className="flex-1 overflow-y-auto bg-graphite ">
    {/* {children_here} */}
      
    </div>

    <div className="flex justify-center h-15 shrink-0 p-3 border-gray-800 bg-gray-800">
      <input name="messagebox" className="text-white w-full bg-gray-900 rounded-xl p-2" placeholder="Message..." />
    </div>
    </>
  );
}
