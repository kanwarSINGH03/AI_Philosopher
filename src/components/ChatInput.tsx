"use client";
import React, { HTMLAttributes, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "react-query";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";
import { MessagesContext } from "@/context/messages";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatInput({ className, ...props }: ChatInputProps) {
  const [input, setInput] = useState<string>("");

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
      });
      return response.body;
    },

    onMutate(message){
      addMessage(message)
    },//to display ussr's messages as well

    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream found");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      setIsMessageUpdating(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
  });

  return (
    <div
      {...props}
      className={cn("w-full rounded-lg border-none outline-none", className)}
    >
      <TextareaAutosize
        ref={textareaRef}
        rows={2}
        maxRows={4}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const message: Message = {
              id: nanoid(),
              isUserMessage: true,
              text: input,
            };
            sendMessage(message);
          }
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        placeholder={"Present your Thoughts...."}
        spellCheck={false}
        className={
          "w-full min-h-[80px] bg-white bg-opacity-80 rounded-lg shadow-lg p-2 text-gray-950 placeholder-gray-950 focus:ring-0"
        }
      />
    </div>
  );
}
