'use client';

import SearchFriends from "@/ui/searchFriends";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function FriendsHeader() {
    function submitTest(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log(formData.get("searchbox")?.toString().trim());
    };

  return(
    // <div className="flex flex-row justify-center items-center shrink-0 h-15 p-3 bg-barbie-pink">
    <form onSubmit={submitTest} className="flex flex-row justify-center items-center shrink-0 h-15 p-3 bg-barbie-pink">
      <SearchFriends />
      <button type="submit" className="pl-3">
        <PaperAirplaneIcon className="w-9 hover:text-hot-rose transition-all duration-200" />
      </button>
    </form>
    // </div>
  );
}