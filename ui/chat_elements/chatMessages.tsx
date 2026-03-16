
import { getConversationMessages } from "@/lib/ConversationActions";
import { convoID } from "@/lib/definitions";
import ChatBubble from "@/ui/chat_elements/chatBubble";

export default async function ChatMessages({ convoID: id }: convoID) {
  const conversationID = id;
  const messages = (await getConversationMessages(conversationID)) ?? [];

  // onload() = async () => {
  //   (await getConversationMessages(conversationID)) ?? []
  // };

  return (
    <div className="flex-1">
      {messages && (messages.toReversed().map((bubble) => (
              <ChatBubble key={bubble.messageid} {...bubble}/>
            )))}
    </div>
  );
}