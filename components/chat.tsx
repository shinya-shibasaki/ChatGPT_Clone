import { Messages } from "./messages";
import { ChatInput } from "./chat-input";

export function Chat() {
    const messages = [
        {
            id: "1",
            role: "user",
            parts: [
                {
                    type: "text",
                    text: "こんにちは！ ",
                },
            ],
        },
        {
            id: "2",
            role: "assistant",
            parts: [
                {
                    type: "text",
                    text: "こんにちは！ 何かお手伝いできることはありますか？ ",
                },
            ],
        },
    ];
    return (
        <div className="flex flex-col min-w-0 h-dvh bg-background">
            <Messages messages={messages} />
            <ChatInput />
        </div>
    );
}