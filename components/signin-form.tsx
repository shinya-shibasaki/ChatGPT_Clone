"use client";

import { signin, SigninActionState } from "@/app/(auth)/actions";
import { AuthForm } from "./auth-form";
import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function SigninForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [state, formActioin ] = useActionState<SigninActionState, FormData>(
        signin,
        {
            status: "idle",
        },
    );

    useEffect(() => {
        if (state.status === "failed") {
            toast.error("認証情報が無効です");
        } else if (state.status === "invalid_data") {
            toast.error("サインインに失敗しました");
        } else if (state.status === "success") {
            toast.success("サインインに成功しました");
            router.push("/");
        }
    }, [state]);


    const handleSubmit = (formData: FormData) => {
        setEmail(formData.get("email") as string);
        formActioin(formData);
    };
    return (
        <AuthForm action={handleSubmit} email={email}>
            <button
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm cursor-pointer border border-zinc-300 font-medium hover:bg-zinc-800 h-10 px-4 py-2"
            type="submit">
                サインイン
            
            </button>
        </AuthForm>
    )

}