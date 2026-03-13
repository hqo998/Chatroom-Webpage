import { bitcount } from "@/ui/fonts";
import { otherParticipants } from "@/lib/ConversationActions";

import { convoID } from "@/lib/definitions";

export default async function ChatHeader({ convoID: id }: convoID) {
  const conversationID = id;
  const convoNames = (await otherParticipants(conversationID));

  let conversationName = []
  if (!convoNames) conversationName = ["Failed to get chat name."];
  conversationName = convoNames;

  return (
    <div className="flex-1 flex flex-row justify-left gap-3 items-center px-5 overflow-x-auto">
      {conversationName.map((name) =>
        <p key={name} className={`${bitcount.className} antialiased text-2xl`}>
          @{name}
        </p>
      )}
    </div>
  );
};