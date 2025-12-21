"use client";

import { AvatarMenu } from "./avatar-menu";

export function ChatHeader() {
    return (
        <header className="flex sticky top-0 bg-background py-1.5 justify-between items-center px-2 md:px-2 gap-2 h-16">
            <div className="flex"></div>
            <AvatarMenu />
        </header>
    )
}