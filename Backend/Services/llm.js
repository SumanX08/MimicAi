import OpenAI from "openai"
import dotenv from "dotenv";

dotenv.config();

const client= new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
})

export const Reply=async(messages)=>{

    const res=await client.chat.completions.create({
        model:"gpt-4.1-mini",
        messages
    })

        return res.choices[0].message.content;

}