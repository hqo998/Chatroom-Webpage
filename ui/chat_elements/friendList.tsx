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
      id: "22",
      chatname: "charles",
      last_message: "hi blah blah blah"
    },
    {
      id: "12",
      chatname: "charles",
      last_message: "hi blah blah blah"
    },
    {
      id: "3",
      chatname: "lewis",
      last_message: "dog water"
    },
    {
      id: "1000",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "23",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "10414500",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "1012300",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "23120",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "2311220",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "231420",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "233120",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "23112220",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "2312340",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    {
      id: "231125120",
      chatname: "jethro",
      last_message: "lerom ipson babbby lerom ipson babbby lerom ipson babbby"
    },
    
  ];

  return (
    <>
      {data.map((chats) => (
        <ChatTile key={chats.id} chatname={chats.chatname} last_message={chats.last_message}/>
      ))}
    </>
  );
}