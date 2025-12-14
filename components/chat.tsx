'use client';

import { Messages } from "./messages";
import { ChatInput } from "./chat-input";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export function Chat() {

    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat();

    return (
        <div className="flex flex-col min-w-0 h-dvh bg-background">
            <Messages messages={messages} />
            <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            status={status}
            />
        </div>
    );
}