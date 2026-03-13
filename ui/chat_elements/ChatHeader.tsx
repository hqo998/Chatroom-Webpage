'use client';

import { bitcount } from "@/ui/fonts";
import { usePathname } from 'next/navigation';
import { otherParticipants } from "@/lib/ConversationActions";
import { useState, useEffect } from "react";

export default function ChatHeader() {

  const pathName = usePathname();
  const SplitPath = pathName.split('/');
  const [ conversationName, setConversationName ] = useState<string[]>([]);

  useEffect(() => {
  const loadConversationName = async () => {
    const conversationID = SplitPath[SplitPath.length - 1];
    const convoNames = (await otherParticipants(conversationID))
    // console.log(convoNames);

    if (!convoNames) setConversationName(["Failed to get chat name."]);

    setConversationName(convoNames);
  };

  loadConversationName();
}, []);


  return (
    <div className="flex-1 flex flex-row justify-left gap-3 items-center px-5 overflow-x-auto">
      {conversationName.map((name) =>
        <p key={name} className={`${bitcount.className} antialiased text-2xl`}>
          @{name}
        </p>
      )}
    </div>
  );
};