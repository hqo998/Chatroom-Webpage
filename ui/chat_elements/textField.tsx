import { sendMessage } from "@/lib/ConversationActions";

export default function MessageField() {
  return (
  <div className="flex justify-center h-15 shrink-0 p-3 border-gray-800 bg-gray-800">
      <input
        name="messagebox"
        className="text-white w-full bg-gray-900 rounded-xl p-2"
        placeholder="Message..."
        // onSubmit={sendMessage}
        />
    </div>
  );
}