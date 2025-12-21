'use client';

import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import { useActionState, useEffect, useState } from "react";
import { Signup, SignupActionState } from "@/app/(auth)/actions";
import toast from "react-hot-toast";

export function SignupForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const [state, formAction] = useActionState<SignupActionState, FormData>(
        Signup,
        {
            status: "idle",
        },
    );

    useEffect(() => {
        console.log(state);
        if (state.status === "user_exists") {
            toast.error("アカウントは既に存在します");
        } else if (state.status === "failed") {
            toast.error("アカウントの作成に失敗しました");
        } else if (state.status === "invalid_data") {
            toast.error("無効なデータが提供されました");
        } else if (state.status === "success") {
            toast.success("アカウントが正常に作成されました");

            router.push("/");
        }
    }, [state]);

    const handleSubmit = (formData: FormData) => {
        setEmail(formData.get("email") as string)
        formAction(formData);
    };
    return (
        <AuthForm action={handleSubmit} email={email}>
            <button
                className="inline-flex items-center justify-center gap-2 border border-zinc-200 rounded-md text-sm cursor-pointer font-medium dark:hover:bg-zinc-800 hover:bg-zinc-200 h-10 px-4 py-2"
                type="submit"
            >
                アカウント登録
            </button>
        </AuthForm>
    );
}