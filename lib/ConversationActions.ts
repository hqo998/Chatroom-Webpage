'use server'

import { auth } from "@/auth";
import type { chatMessageProps, friendListItem, User } from '@/lib/definitions';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

function checkUUIDvalid(uuid: string) {
  const uuidV4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidV4Pattern.test(uuid)) {
    return false;
  }

  return true;

}

export async function getFriendList() {
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

    const lastMessage = messages[0]?.content ?? "";
    
    // filter by creation date or last message date if message exists.
    let lastMessageTime = new Date();
    if (messages[0]?.created_at) {
      lastMessageTime = messages[0]?.created_at;
    } else {
      lastMessageTime = (await sql`SELECT created_at FROM conversations WHERE id = ${info.conversation_id} LIMIT 1`)[0].created_at;
    }

    const lastMessageCount = messages.filter(
      (m) => info.last_read_at && m.created_at > info.last_read_at
    ).length;

    chats.push({
      chatid: info.conversation_id,
      chatname: name,
      last_timestamp: lastMessageTime,
      last_message: lastMessage,
      unread_count: lastMessageCount,
      avatar: "",
    });
  }

  // sort em by date.
  chats.sort((a, b) => b.last_timestamp.getTime() - a.last_timestamp.getTime())

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
  redirect(`/chat/${newChat[0].id}`);
}


export async function otherParticipants(conversation_id: string) {
  const session = await auth();

  // make sure that the user is logged in and session as id
  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return [];
  }

  // participants.conversation_id is UUID in Postgres; reject invalid ids early.
  if (!checkUUIDvalid(conversation_id)) {
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

export async function sendMessage(conversation_id: string, content: string) {
  const session = await auth();

  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return;
  }

  // check uuid is valid
  if (!checkUUIDvalid(conversation_id)) {
    return;
  }

  // verify user is participant in conversation.
  const checkLegit = await sql<{user_id: string}[]>`
                                SELECT user_id
                                FROM participants
                                WHERE
                                  user_id = ${session.user.id}
                                  AND conversation_id = ${conversation_id}`
  if (!checkLegit[0]) return;

  if (content.length > 2000) return;

  // save message to conversation.
  await sql`INSERT INTO messages (conversation_id, sender_id, content)
            VALUES (${conversation_id}, ${session.user.id}, ${content})
            ON CONFLICT (id) DO NOTHING`

  revalidatePath(`/chat/${conversation_id}`);
  revalidatePath('/chat');

  // console.log("message saved");
}

export async function getUsernameFromID(user_id: string) {
  if (!checkUUIDvalid(user_id)) {
    return "";
  }

  const name = await sql<{name: string}[]>`SELECT name FROM users WHERE id = ${user_id}`;

  return name ? name[0].name : "";
}

export async function getConversationMessages(conversation_id: string) {
  const session = await auth();

  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return [];
  }

  // participants.conversation_id is UUID in Postgres; reject invalid ids early.
  if (!checkUUIDvalid(conversation_id)) {
    return [];
  }

  // verify user is participant in conversation.
  const checkLegit = await sql<{user_id: string}[]>`
                                SELECT user_id
                                FROM participants
                                WHERE
                                  user_id = ${session.user.id}
                                  AND conversation_id = ${conversation_id}`;
  if (!checkLegit[0]) return [];

  // get messages in conversation.

  const messages = (await sql<{ content: string; created_at: Date; sender_id: string; id: string }[]>`SELECT content, created_at, sender_id, id
                      FROM messages
                      WHERE conversation_id = ${conversation_id}
                      ORDER BY created_at DESC
                      LIMIT 100
                      `);

  const chatMessages: chatMessageProps[] = [];

  for (const text of messages) {
    const name = await getUsernameFromID(text.sender_id);

    chatMessages.push({
      timestamp: text.created_at,
      message: text.content,
      messageid: text.id,
      senderId: text.sender_id,
      viewerId: session.user.id,
      sender: name,
  });
  }

  return chatMessages;
}

export async function updateLastReadParticipant(conversation_id: string) {
  const session = await auth();

  if (!session?.user.id) {
    console.warn('Not Authenticated');
    return [];
  }

  // participants.conversation_id is UUID in Postgres; reject invalid ids early.
  if (!checkUUIDvalid(conversation_id)) {
    return [];
  }

  await sql`UPDATE participants
            SET last_read_at = NOW()
            WHERE
              conversation_id = ${conversation_id}
              AND user_id = ${session.user.id}`;
}