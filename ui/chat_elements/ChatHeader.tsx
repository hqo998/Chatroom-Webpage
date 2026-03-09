'use client';

import { bitcount } from "@/ui/fonts";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function ChatHeader() {
  const pathName = usePathname();
  const SplitPath = pathName.split('/');
  
  const ConversationID = SplitPath[SplitPath.length - 1];

  const ConversationName = ConversationID; // temp

  return (
    <div className="flex-1 flex flex-row justify-between items-center px-5">
      <p className={`${bitcount.className} antialiased text-2xl`}>
        @{ConversationName}
      </p>
    </div>
  );
};