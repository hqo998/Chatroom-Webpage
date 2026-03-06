import { friendsListData } from "@/lib/placeholder-data";
import ChatTile from "@/ui/chat_elements/chatTile";

export default function FriendList() {
  const data = friendsListData;

  return (
    <>
      {data.map((chats) => (
        <ChatTile key={chats.chatid} {...chats}/>
      ))}
    </>
  );
}