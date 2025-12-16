import React from "react";

export default function AuthFooter() {
    return (
        <>
            <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                <a href="/terms" className="hover:underline">利用規約</a>
                <span> | </span>
                <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
            </div>
        </>
    )
}