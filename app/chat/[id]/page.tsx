import { updateLastReadParticipant } from "@/lib/ConversationActions";
import ChatHeader from "@/ui/chat_elements/ChatHeader";
import ChatMessages from "@/ui/chat_elements/chatMessages";
import MessageField from "@/ui/chat_elements/textField";
import { Suspense } from "react";

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

    <div className="flex-1 flex overflow-y-auto bg-graphite ">
      {/* {children_here} */}
      <Suspense>
        <ChatMessages convoID={id}/>
      </Suspense>
    </div>

    {/* text field */}
    <Suspense>
      <MessageField convoID={id} />
    </Suspense>
    </>
  );
}
