import { auth } from "@/app/(auth)/auth";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { getChatById, saveChat, saveMessage } from "@/lib/db";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { id, messages }: { id: string; messages: Array<UIMessage> } = await req.json();
    const session = await auth();

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const message = messages[messages.length - 1];

    // await saveChat({ id, userId: session.user.id});
    const chat = await getChatById({ id });
    if (chat) {
        if (chat.userId !== session.user.id) {
            return new Response("Unauthorized", { status: 401 });
        }
    } else {
        await saveChat({ id, userId: session.user.id });
    }
    
    await saveMessage({
        message: {
            chatId: id,
            id: message.id,
            role: "user",
            parts: message.parts,
        },
    });

    const modelMessages = convertToModelMessages(messages);

    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages: modelMessages, 
        onFinish: async ({ response }) => {
            try {
                const assistant = [...(response.messages ?? [])]
                    .reverse()
                    .find((m: any) => m?.role === "assistant");

                if (!assistant) return;

                const parts =
                    (assistant as any).parts ??
                    (assistant as any).content ??
                    [];

                await saveMessage({
                    message: {
                        id: (assistant as any).id ?? crypto.randomUUID(),
                        chatId: id,
                        role: "assistant",
                        parts,
                    },
                });
            } catch (e) {
                console.error("チャットの保存に失敗しました", e);
            }
        },
    });

    return result.toUIMessageStreamResponse();
}