import ChatBubble from "@/ui/chat_elements/chatBubble";

export default function ChatMessages() {
  const messages = ;
  
  return (
    <div className="rounded-2xl">
      {messages.map((bubble) => (
              <ChatBubble key={bubble.messageid} {...bubble}/>
            ))}
    </div>
  );
}