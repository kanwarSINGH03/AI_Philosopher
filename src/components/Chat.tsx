import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ChatInput from "@/components/ChatInput";
import { Component } from "react";
import ChatMessages from "@/components/ChatMessages";

export default function Chat() {
  return (
    <div className={"flex flex-col min-w-[700px]"}>
      <ChatMessages className={"flex-1 m-2 max-h-[500px]"} />
      <ChatInput className={"flex-1 relative m-2"} />
    </div>
  );
}
