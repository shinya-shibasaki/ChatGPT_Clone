import { useScrollToBottom } from "@/app/hook/use-scroll-to-bottom";
import { Message } from "./message";
import { Greeting } from "./greeting";

export function Messages({ messages }: any) {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  return (
    <div ref={messagesContainerRef} className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      {messages.length === 0 && <Greeting />}
      
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
    </div>
  );
}