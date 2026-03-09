'use server'

import { auth } from "@/auth";

export async function createChat(prevState: any, username: string) {
  const session = await auth();
  if (!session?.user?.name) {
    console.log(session?.user?.name);
    console.warn('Not Authenticated');
    return 'Not logged in.';
  }

  // check username matches someone in the db

  // check if conversation already exists

  // make conversationid

  // add participants to conversation

  // redirect user to new conversation id
}