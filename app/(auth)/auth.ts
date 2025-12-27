import { getUserByEmail } from "@/lib/db";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {},
            async authorize({ email, password }: any) {
                const queryResult = await getUserByEmail(email);
                const user = queryResult?.user;

                if (!user) {
                    throw new Error("User not found");
                }
                if (!user.passwordHash) {
                    throw new Error("User password not exists");
                }
                const result = compareSync(password, user.passwordHash);
                if (!result) {
                    throw new Error("user password not match");
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});