import {z} from "zod"

export const ThoughtSchema = z.object({
    id: z.string(),
    isUserThought: z.boolean(),
    text: z.string()
})

export const ThoughtArraySchema = z.array(ThoughtSchema)

export type  Thought = z.infer<typeof ThoughtSchema>
