'use client';

import { createChat } from "@/lib/ConversationActions";
import SearchFriends from "@/ui/searchFriends";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function FriendsHeader() {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const [errorMessage, formAction, isPending] = useActionState(
      createChat,
      undefined,
    );

    function submitTest(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get("searchbox")?.toString().trim();
      
      if (!username) return;

      console.log(username);

      formAction(username!);
    };

  return(
    <>
      <form
        className="flex flex-row justify-center items-center shrink-0 h-15 p-3 bg-barbie-pink"
        action={(formData) => {
          const username = formData.get("searchbox")?.toString().trim();
          if (!username) return;
          console.log(username);
          formAction(username!);
        }}
      >
        <SearchFriends />
        <button type="submit" className="pl-3">
          <PaperAirplaneIcon className="w-9 hover:text-hot-rose transition-all duration-200" />
        </button>
      </form>

      {isMounted && errorMessage && createPortal(
        <div className="fixed bottom-5 left-1/2 z-9999 flex -translate-x-1/2 flex-row items-center justify-center rounded-md bg-white/95 px-3 py-2 text-red-500 shadow-lg">
          <ExclamationCircleIcon className="h-5 w-5 text-lavendar" />
          <p className="pl-2 text-sm">{errorMessage}</p>
        </div>
        ,
        document.body
      )}
    </>
  );
}