'use client';

import Form from 'next/form';

export function AuthForm({
    action,
    children,
    email,
}: {
    action: NonNullable<
        string | ((formData: FormData) => void | Promise<void>) | undefined>;
    children: React.ReactNode;
    email?: string;
}) {
    return (
        <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
            <div className="flex flex-col gap-2">
                <input
                    className="flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-md md:text-sm"
                    placeholder='user@example.com'
                    autoComplete='email'
                    type="email"
                    name='email'
                    defaultValue={email}
                />
            </div>
            <div className="flex flex-col gap-2">
                <input
                className="flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-md md:text-sm"
                type="password"
                name='password'
                />
            </div>
            {children}
        </Form>
    );
}