'use server';

import { signIn } from "./auth";
import * as v from "valibot";
import { createUser, getUserByEmail } from "@/lib/db";
import { genSaltSync, hashSync } from "bcrypt-ts";

export interface SignupActionState {
    status: "idle" | "success" | "failed" | "user_exists" | "invalid_data";
}

export interface SigninActionState {
    status: "idle" | "success" | "failed" | "invalid_data";
}

export const Signup = async (
    _: SignupActionState,
    formData: FormData,
): Promise<SignupActionState> => {
    try {
        const validatedData = await v.parseAsync(
            v.object({
                email: v.pipe(v.string(), v.email()),
                password: v.pipe(v.string(), v.minLength(8), v.maxLength(20)),
            }),
            Object.fromEntries(formData.entries()),
        );

        const user = await getUserByEmail(validatedData.email);

        if (user) {
            return { status: "user_exists" } as SignupActionState;
        }
        const salt = genSaltSync(10);
        const passwordHash = hashSync(validatedData.password, salt);
        await createUser(validatedData.email, passwordHash);

        await signIn('credentials', {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
        });

        return { status: "success" };
    } catch (error) {
        if (error instanceof v.isValiError) {
            return { status: "invalid_data"};
        }

        console.error(error);
        return { status: "failed" };
     }
};

export const signin = async (
    _: SigninActionState,
    formData: FormData,
): Promise<SigninActionState> => {
    try {
        const validatedData = await v.parseAsync(
            v.object({
                email: v.pipe(v.string(), v.email()),
                password: v.pipe(v.string(), v.minLength(8), v.maxLength(20)),
            }),
            Object.fromEntries(formData.entries()),
        );

        const user = await getUserByEmail(validatedData.email);

        if (!user) {
            return { status: "failed" } as SigninActionState;
        }
        await signIn('credentials', {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
        });

        return { status: "success" };
    } catch (error) {
        if (error instanceof v.isValiError) {
            return { status: "invalid_data"};
        }
        return { status: "failed" };
    }
}