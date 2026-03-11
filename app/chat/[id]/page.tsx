
import ChatHeader from "@/ui/chat_elements/ChatHeader";
import MessageField from "@/ui/chat_elements/textField";
import { intern } from "@/ui/fonts";

export default function Home() {
  return (
    <>
    <div className="flex-1 flex max-h-15 bg-gray-800">
      <ChatHeader />
    </div>

    <div className="flex-1 overflow-y-auto bg-graphite ">
    {/* {children_here} */}
    </div>

    {/* text field */}
    <MessageField />
    </>
  );
}
