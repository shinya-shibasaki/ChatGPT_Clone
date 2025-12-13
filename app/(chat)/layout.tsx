export default async function Layout({
    children,
} : {
    children : React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-svh flex-1 flex-col">{children}</div>
    );
}