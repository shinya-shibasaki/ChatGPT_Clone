import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { CodeBlock } from "./code-block";

const components: Partial<Components> = {
    // @ts-expect-error: CodeBlock type mismatch is intentional for custom rendering
    code: CodeBlock,
};

export const Markdown = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown components={components}>
            {children}
        </ReactMarkdown>
    )
}
