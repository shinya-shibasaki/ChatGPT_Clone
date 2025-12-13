export const Message = ({
  message,
}: {
  message: any;
}) => {
  return (
    <div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      data-role={message.role}
    >
      <div className="flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit">
        <div className="flex flex-col gap-4 w-full">
          {message.parts?.map((part, index) => {
            const { type } = part;
            const key = `message-${message.id}-part-${index}`;

            if (type === "text") {
              return (
                <div key={key} className="flex flex-row gap-2 items-start">
                  <div
                    className={`flex flex-col gap-4 ${
                      message.role === "user"
                        ? "bg-zinc-200 dark:bg-zinc-700 dark:text-white text-black px-3 py-2 rounded-xl"
                        : ""
                    }`}
                  >
                    {part.text}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};