import { Message } from "./message";

export function Messages({ messages }: any) {
  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      <div className="shrink-0 min-w-[24px] min-h-[24px]" />
    </div>
  );
}