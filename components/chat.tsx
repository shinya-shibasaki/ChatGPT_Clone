'use client';

import { Messages } from "./messages";
import { ChatInput } from "./chat-input";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ChatHeader } from "./header";
import { Session } from "next-auth";
import { UIMessage } from "ai";

export function Chat({
    id,
    session,
    initialMessages,
}: {
    id: string;
    session: Session;
    initialMessages: Array<UIMessage>;
}) {

    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat({ id, messages: initialMessages, });

    return (
        <div className="flex flex-col min-w-0 h-dvh bg-background">
            <ChatHeader session={session} />
            <Messages messages={messages} />
            <ChatInput
                chatId={id}
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                status={status}
            />
        </div>
    );
}