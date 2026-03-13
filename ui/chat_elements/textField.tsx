'use client';

import { sendMessage } from "@/lib/ConversationActions";
import { convoID } from "@/lib/definitions";



export default function MessageField({ convoID: id }: convoID) {

  async function sendMessageAction(formData: FormData) {

    const messageContent = String(formData.get('messagebox') ?? '').trim();
    if (!messageContent) return;

    await sendMessage(id, messageContent);
  }

  return (
  <div className="flex justify-center h-15 shrink-0 p-3 border-gray-800 bg-gray-800">
      <form action={sendMessageAction} className="w-full">
        <input
          name="messagebox"
          className="text-white w-full bg-gray-900 rounded-xl p-2"
          placeholder="Message..."
          />
      </form>
    </div>
  );
}