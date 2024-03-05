import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ChatInput from "@/components/ChatInput";
import { Component } from "react";
import ChatMessages from "@/components/ChatMessages";

export default function Chat() {
  return (
    <div className={"w-full m-12"}>
      <ChatMessages className={"flex items-stretch m-2 max-h-[500px] min-h-[500px]"} />
      <ChatInput className={"flex items-stretch m-2"} />
    </div>
  );
}
