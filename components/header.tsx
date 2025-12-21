"use client";

import { AvatarMenu } from "./avatar-menu";
import { Session } from "next-auth";

export function ChatHeader({ session }: { session: Session }) {
    return (
        <header className="flex sticky top-0 bg-background py-1.5 justify-between items-center px-2 md:px-2 gap-2 h-16">
            <div className="flex"></div>
            <AvatarMenu session={session} />
        </header>
    )
}