import { prisma } from "./prisma";

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return null;
    }

    return { user };
}

export async function createUser(email: string, passwordHash: string) {
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
        },
    });

    return user;
}