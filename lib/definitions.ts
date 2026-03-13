export type User = {
  id: string;
  name: string;
  password: string;
  image_url: string;
  admin: boolean;
  created_at: Date;
}

export type friendListItem = {
  chatid: string;
  chatname: string;
  last_message: string;
  last_timestamp: Date;
  unread_count: number;
  avatar: string;
}

export type chatMessageProps = {
  messageid: string;
  message: string;
  senderId: string;
  viewerId: string;
  sender: string;
  // conversationid: string;
  timestamp: Date;
}

export type convoID = {
  convoID: string,
}
