'use client';

// import { friendsListData } from "@/lib/placeholder-data";
import ChatTile from "@/ui/chat_elements/chatTile";
import { friendListItem } from "@/lib/definitions";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { getFriendList } from "@/lib/ConversationActions";

export default function FriendList() {
  const [ data, setData ] = useState<friendListItem[]>([]);
  
  useEffect(() => {
    const loadFriendList = async () => {
      const friendListInfo = await getFriendList();
      // console.log(friendListInfo);

      setData(friendListInfo);
    }

    loadFriendList();

    const interval = setInterval(() => {
      loadFriendList();
    }, 5000);

    return () => clearInterval(interval);

  }, [])

  // const data = friendsListData;
  const searchParams = useSearchParams();

  const query = searchParams.get('query');

  const displayData = data.filter(term => term.chatname.toLowerCase().includes(query || ""));
  // console.log(displayData);

  return (
    <>
      {displayData.map((chats) => (
        <ChatTile key={chats.chatid} {...chats}/>
      ))}
    </>
  );
}