export type User = {
  id: string;
  name: string;
  password: string;
  image_url: string;
  admin: boolean;
}

export type chatTileProps = {
  chatid: string;
  chatname: string;
  last_message: string;
  timestamp: string;
  unread_count: number;
  avatar: string;
}

export type chatMessageProps = {
  messageid: string;
  message: string;
  sender: string;
  conversationid: string;
  timestamp: string;
}