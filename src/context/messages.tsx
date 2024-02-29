import { createContext, ReactNode, useState } from "react";
import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";

// components in this context that is input, messages and chat have access to same context  like a const
// or in our case the chat content itself

//<> this used to declare type in typescript
export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean; //while gpt is writing the message
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      text: "Love You TANA!!",
      isUserMessage: false,
    },
  ]);
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };
  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string,
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      }),
    );
  };
  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
