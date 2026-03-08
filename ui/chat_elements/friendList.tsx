'use client';

import { friendsListData } from "@/lib/placeholder-data";
import ChatTile from "@/ui/chat_elements/chatTile";
import { chatTileProps } from "@/lib/definitions";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

export default function FriendList() {
  const [ data, setData ] = useState<chatTileProps[]>([]);
  
  useEffect(() => {
    setData(friendsListData)
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