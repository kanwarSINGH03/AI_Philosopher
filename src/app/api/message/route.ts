import {MessageArraySchema} from "@/lib/validators/message";
import {ChatGPTMessage, OpenAIStream, OpenAIStreamPayload} from "@/lib/openai-stream";
import {chatbotPrompt} from "@/app/helpers/constants/chatbot-prompt";

export async function POST(req: Request) {
    const {messages} = await req.json()

    //make sure client input is legit and has required thought schema format to make it secure

    const parsedMessages = MessageArraySchema.parse(messages)

    //thoughts to send gpt
    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({

        role: message.isUserMessage ? 'user' : 'system',
        content: message.text,

    }))

    outboundMessages.unshift({
        role: 'system',
        content: chatbotPrompt,
    })


    //can use gpt 4 as well but that reasons and is slow (like a human ??)
    const payload: OpenAIStreamPayload = {

        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.4, //creativity metric of chatgpt
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true, //required to have the readable stream back from openai api
        n: 1,

    }
    //returns stream to the frontend
    const stream = await OpenAIStream(payload)


    return new Response(stream)

}