"use client";
import { HTMLAttributes, useContext } from "react";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {}
export default function ChatMessages({
  className,
  ...props
}: ChatMessageProps) {
  const { messages } = useContext(MessagesContext);

  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-auto p-4 w-full",
        "rounded-xl shadow-lg bg-white bg-opacity-80",
        "scrollbar-thin scrollbar-thumb-black scrollbar-track-blue-lighter", // Using tailwind-scrollbar plugin classes
        className,
      )}
    >
      {inverseMessages.map((message) => (
        <div key={message.id} className={"chat-message mb-2 last:mb-0"}>
          <div
            className={cn(
              "flex items-end",
              {
                "justify-end": message.isUserMessage,
                "justify-start": !message.isUserMessage,
              },
              "group",
            )}
          >
            <div
              className={cn("rounded-lg px-4 py-2 shadow", "max-w-xs mx-2", {
                "bg-blue-500 text-white": message.isUserMessage,
                "bg-gray-100 text-gray-800": !message.isUserMessage,
              })}
            >
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
