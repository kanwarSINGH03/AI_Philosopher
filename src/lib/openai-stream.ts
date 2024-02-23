//format enforced by open ai for a chat gpt agent
export type ChatGPTAgent = "user" | "system"
export interface ChatGPTMessage {
    role: ChatGPTAgent
    content: string

}

export interface OpenAIStreamPayload {
    model: string,
    thoughts: ChatGPTMessage[],
    temperature: number, //creativity metric of chatgpt
    top_p: number,
    frequency_penalty: number,
    presence_penalty: number,
    max_tokens: number,
    stream: boolean,//required to have the readable stream back from openai api
    n: number

}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()


    let counter = 0 //so that we can mutate this later

    const res = await fetch('http://api.openai.com/v1/chat/completions')
}