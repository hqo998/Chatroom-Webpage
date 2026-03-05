
export default function ChatTile(props: { chatname?: string }) {
  return (
    <div className="bg-amber-300 border-amber-600 h-5">
      {props.chatname}
    </div>
  );
}