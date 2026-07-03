import {Router} from "express"
import hiteshPrompt from "../Prompts/Hitesh.js"
import piyushPrompt from "../Prompts/Piyush.js"
import { Reply} from "../Services/llm.js"

const router=Router()

router.post("/",async (req,res)=>{
    try {
        const{persona,history=[],message}=req.body
        const Prompt = persona === "hitesh"? hiteshPrompt: piyushPrompt;
        const messages=[
            {
                role:"system",
                content:Prompt
            },
            ...history,
            {
                role:"user",
                content:message,
            },
        ]

        const reply = await Reply(messages)

        res.json({
            success:true,
            reply,
        })


    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
        
    }
})

export default router
