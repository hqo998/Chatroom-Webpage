'use client';

import { getConversationMessages } from "@/lib/ConversationActions";
import { chatMessageProps, convoID } from "@/lib/definitions";
import ChatBubble from "@/ui/chat_elements/chatBubble";
import { useEffect, useState } from "react";

export default function ChatMessages({ convoID: id }: convoID) {
  // const messages = (await getConversationMessages(conversationID)) ?? [];
  const [ messages, setMessages ] = useState<chatMessageProps[]>([]);

  useEffect(() => {
    const onload = async () => {
      setMessages((await getConversationMessages(id)) ?? []);
    };
    onload();

    const interval = setInterval(() => {
      onload();
    }, 2000);

    return () => clearInterval(interval);
  }, [id])

  return (
    <div className="flex-1">
      {messages && (messages.toReversed().map((bubble) => (
              <ChatBubble key={bubble.messageid} {...bubble}/>
            )))}
    </div>
  );
}