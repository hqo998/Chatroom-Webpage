import { updateLastReadParticipant } from "@/lib/ConversationActions";
import ChatHeader from "@/ui/chat_elements/ChatHeader";
import ChatMessages from "@/ui/chat_elements/chatMessages";
import MessageField from "@/ui/chat_elements/textField";

type ChatPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Home({ params }: ChatPageProps) {
  const { id } = await params;
  await updateLastReadParticipant(id);

  return (
    <>
    <div className="flex-1 flex max-h-15 bg-gray-800">
      <ChatHeader convoID={id}/>
    </div>

    <div className="flex-1 overflow-y-auto bg-graphite ">
    {/* {children_here} */}
    <ChatMessages convoID={id}/>
    </div>

    {/* text field */}
    <MessageField convoID={id} />
    </>
  );
}
