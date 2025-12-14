import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const modelMessages = convertToModelMessages(messages);
    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages: modelMessages, 
    });

    return result.toUIMessageStreamResponse();
}