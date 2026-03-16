'use client';

import { getConversationMessages, updateLastReadParticipant } from "@/lib/ConversationActions";
import { chatMessageProps, convoID } from "@/lib/definitions";
import ChatBubble from "@/ui/chat_elements/chatBubble";
import { useEffect, useRef, useState } from "react";

export default function ChatMessages({ convoID: id }: convoID) {
  // const messages = (await getConversationMessages(conversationID)) ?? [];
  const [ messages, setMessages ] = useState<chatMessageProps[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onload = async () => {
      const newMessages = (await getConversationMessages(id)) ?? []
      // only set messages if its not the same as previous.
      setMessages(prev => {
        if (newMessages.length === prev.length && newMessages[0]?.messageid === prev[0]?.messageid) {
          return prev;
        }
        return newMessages;
      });
    };
    onload();

    const interval = setInterval(() => {
      updateLastReadParticipant(id);
      onload();
    }, 2000);

    return () => clearInterval(interval);
  }, [id])


  useEffect(() => {
    // scroll to buttom of message field blah blah
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])


  return (
    <div className="flex-1 overflow-y-auto">
      {messages && (messages.toReversed().map((bubble) => (
              <ChatBubble key={bubble.messageid} {...bubble}/>
            )))}
      <div ref={bottomRef}/>
    </div>
  );
}