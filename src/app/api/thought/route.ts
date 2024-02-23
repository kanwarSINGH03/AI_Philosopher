import {ThoughtArraySchema} from "@/lib/validators/thought";
import {ChatGPTMessage, OpenAIStream, OpenAIStreamPayload} from "@/lib/openai-stream";
import {chatbotPrompt} from "@/app/helpers/constants/chatbot-prompt";

export async function POST(req: Request) {
    const {thoughts} = await req.json()

    //make sure client input is legit and has required thought schema format to make it secure

    const parsedThoughts = ThoughtArraySchema.parse(thoughts)

    //thoughts to send gpt
    const outboundThoughts: ChatGPTMessage[] = parsedThoughts.map((thought) => ({
        role: thought.isUserThought ? "user" : "system",
        content: thought.text
    }))

    outboundThoughts.unshift({
        role: "system",
        content: chatbotPrompt
    })
    //can use gpt 4 as well but that reasons and is slow (like a human ??)
    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        thoughts: outboundThoughts,
        temperature: 0.4, //creativity metric of chatgpt
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,//required to have the readable stream back from openai api
        n: 1

    }
    //returns stream to the frontend
    const stream = await OpenAIStream(payload)


    return new Response(stream)

}