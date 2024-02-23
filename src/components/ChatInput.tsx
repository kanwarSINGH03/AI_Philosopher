"use client"
import React, {HTMLAttributes, useState} from 'react';
import {cn} from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize"
import {useMutation} from "react-query";
import {nanoid} from "nanoid";
import {Thought} from "@/lib/validators/thought";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatInput({ className, ...props }: ChatInputProps) {

    const [input, setInput] = useState<string>('')

    const {mutate: sendThoughts,isLoading} = useMutation({
        mutationFn: async (thought: Thought) => {
            const response  = await fetch('/api/thought',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({thoughts: "Hello"})
            })
            return response.body
        },
        onSuccess: () =>{
            console.log("success")
        }
    })

    return (
        <div className={cn('absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-4 flex-1 rounded-lg border-none outline-none',className)} {...props}>
                <TextareaAutosize
                    rows = {2}
                    maxRows={4}
                    onKeyDown={(e) =>{
                        if(e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            const thought: Thought = {
                                id: nanoid(),
                                isUserThought: true,
                                text: input
                            }
                            sendThoughts(thought)
                        }
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    placeholder={"Present your Thoughts...."}
                    className={'min-w-[500px] min-h-[50px] bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-2 text-gray-950 placeholder-gray-950 focus:ring-0'}
                />
            </div>

    );
}