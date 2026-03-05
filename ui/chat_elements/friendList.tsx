import ChatTile from "@/ui/chat_elements/chatTile";

export default function FriendList() {
  const data = [
    {
      id: "1",
      chatname: "holly",
      last_message: "hi charlie"
    },
    {
      id: "2",
      chatname: "charles",
      last_message: "hi blah blah blah"
    },
    {
      id: "3",
      chatname: "lewis",
      last_message: "dog water"
    },
  ];

  return (
    <>
      {data.map((chats) => (
        <ChatTile key={chats.id} chatname={chats.chatname} />
      ))}
    </>
  );
}