
import { getConversationMessages } from "@/lib/ConversationActions";
import ChatBubble from "@/ui/chat_elements/chatBubble";

type ChatMessagesProps = {
  id: string;
};

export default async function ChatMessages({ id }: ChatMessagesProps) {
  const conversationID = id;
  const messages = (await getConversationMessages(conversationID)) ?? [];

  console.log("id: " + conversationID);
  console.log("messages: " + messages);

  return (
    <div className="rounded-2xl">
      {messages && (messages.map((bubble) => (
              <ChatBubble key={bubble.messageid} {...bubble}/>
            )))}

      {/* {messages.map((bubble) => (
              <ChatBubble key={bubble.messageid} {...bubble}/>
            ))} */}
    </div>
  );
}