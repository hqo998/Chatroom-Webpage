'use server'

import { auth } from "@/auth";
import type { friendListItem, User } from '@/lib/definitions';
import { redirect } from "next/navigation";
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function friendList() {
  const session = await auth();

  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return [];
  }

  const chats: friendListItem[] = [];

  // get conversations user is in.
  const convoInfo = await sql`SELECT conversation_id, last_read_at FROM participants WHERE user_id = ${session.user.id}`;


  for (const info of convoInfo) {
    const name = ((await otherParticipants(info.conversation_id))[0] ?? "Unknown");

    const messages = (await sql<{ content: string; created_at: Date }[]>`SELECT content, created_at
                      FROM messages
                      WHERE conversation_id = ${info.conversation_id}
                      ORDER BY created_at DESC
                      LIMIT 100
                      `)

    

    const lastMessage = messages[0]?.content ?? null;

    const lastMessageCount = messages.filter(
      (m) => info.last_read_at && m.created_at > info.last_read_at
    ).length;

    chats.push({
      chatid: info.conversation_id,
      chatname: name,
      last_message: lastMessage,
      unread_count: lastMessageCount,
      avatar: "",
    });
  }


  return chats;
}


export async function createChat(prevState: any, username: string) {
  const session = await auth();

  // make sure that the user is logged in and session as id
  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return 'Not logged in.';
  }

  // make sure user isnt trying to make chat with themselves
  if (session.user.name === username) return "Can't make a solo chat."

  // check username matches someone in the db
  const potentialMatch = await sql<User[]>`SELECT id, name, image_url, created_at FROM users WHERE name = ${username}`;
  if (!potentialMatch[0]) return 'No user found.'
  const userIDs = [session.user.id, potentialMatch[0].id];

  // check if conversation already exists
  const existingChat = await sql`SELECT conversation_id
                                FROM participants GROUP
                                BY conversation_id
                                HAVING
                                  COUNT(*) = 2
                                  AND COUNT(*) FILTER (WHERE user_id = ${userIDs[0]}) = 1
                                  AND COUNT(*) FILTER (WHERE user_id = ${userIDs[1]}) = 1
                                  `;

  if (0 < existingChat.length) {
    redirect(`/chat/${existingChat[0].conversation_id}`);
  }

  // make conversationid
  const newChat = await sql`INSERT INTO conversations (id) VALUES (gen_random_uuid()) ON CONFLICT (id) DO NOTHING RETURNING id;`
  if (!newChat[0].id) return 'Failed to make new chat.';

  // add participants to conversation
  for (const u_id of userIDs) {
    const addParticipants = await sql`INSERT INTO participants (conversation_id, user_id) VALUES (${newChat[0].id}, ${u_id}) RETURNING 1;`
    if (!addParticipants) return 'Failed to make new chat';
  }

  // redirect user to new conversation id
  redirect(`/chat/${existingChat[0].conversation_id}`);
}

export async function otherParticipants(conversation_id: string) {
  const session = await auth();
  const uuidV4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // make sure that the user is logged in and session as id
  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return [];
  }

  // participants.conversation_id is UUID in Postgres; reject invalid ids early.
  if (!uuidV4Pattern.test(conversation_id)) {
    return [];
  }

  // get participants
  const participants = await sql<{ user_id: string }[]>`
    SELECT user_id FROM participants WHERE conversation_id = ${conversation_id}
  `;
  if (!participants[0]) return [];

  // squash into array
  let participantNames: string[] = [];

  for (const participant of participants) {
    const rows = await sql<{ name: string }[]>`
      SELECT name FROM users WHERE id = ${participant.user_id}
    `;
    if (rows[0]) participantNames.push(rows[0].name);
  }

  // remove themselves
  participantNames = participantNames.filter(term => term !== session?.user.name)

  // console.log(participantNames);

  return participantNames
}