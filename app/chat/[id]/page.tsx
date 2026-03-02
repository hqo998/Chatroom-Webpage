import { intern } from "@/ui/fonts";

export default function Home() {
  return (
    <>
    <div className="flex-1 overflow-y-auto bg-gray-700 ">
    {/* {children_here} */}
    </div>

    <div className="shrink-0 p-4 border-t border-gray-800 bg-gray-800">
      <input className="text-white w-full bg-gray-900 rounded-xl p-2" placeholder="Message..." />
    </div>
    </>
  );
}
