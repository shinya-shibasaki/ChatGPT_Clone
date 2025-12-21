import { signOut } from "next-auth/react";
import { AvatarIcon } from "./icon";
import { useState } from "react";
import { useDropdown } from "@/hooks/use-dropdown";
import Avatar from "boring-avatars";
import { Session } from "next-auth";

export function AvatarMenu({ session }: { session: Session }) {
    const [open, setOpen] = useState(false);
    const menuRef = useDropdown<HTMLDivElement>(() => setOpen(false));
    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm"
                    id="menu-button"
                    onClick={() => {
                        setOpen((prev) => !prev);
                    }}
                >
                    <Avatar
                    name={session.user!.email!}
                    size={40}
                    variant="beam"/>
                </button>
            </div>
            {open && (
                <div className="absolute right-0 z-100 mt-2 w-56 origin-top-right rounded-md shadow-lg dark:bg-zinc-800 ring-black/5">
                    <div className="py-1" role="none">
                        <button
                            className="block px-4 py-2 text-sm"
                            onClick={() => {
                                signOut({ redirectTo: "/" })
                            }}
                        >
                            ログアウト
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}