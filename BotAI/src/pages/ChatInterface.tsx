import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@mui/material";
import ChatActions from "../components/ChatActions"
import BotIntro from "../BotIntro";
import ChatMessages from "../components/ChatMessages";
import {format} from "date-fns"

interface Message{
    id: number
    from:string
    prompt:string
    date:string
    feedback?: string | null
    rating?: number
}


interface Response{
    id :string
    question: string,
    response: string
}
// type Messages = Message[]

interface Props {
    messages?: Message[]
} 

function matchPrompt(prompt:string, data:Response[]) {
    // Normalize the input prompt
    const normalizedPrompt = prompt.toLowerCase();

    // Iterate over each question to find a match
    for (const item of data) {
        // Create a regex pattern for the question
        const regexPattern = new RegExp(item.question.toLowerCase()
            .replace(/[\s?]/g, '.*')
            .replace(/get|post|rest|promise|async\/await|cors|microservices|virtual dom|jwt|docker|mvc|graphql|redux|hooks|serverless|websocket|typescript|noSQL|responsive design|git|accessibility|user experience|service workers/g, match => `(${match})`), 
            'i');
        
        // Test the pattern against the normalized prompt
        if (regexPattern.test(normalizedPrompt)) {
            return item.response;
        }
    }

    // If no match found, return a default response
    return "As an AI language model, I don't have access to this detials, Ask me else..";
}

const ChatInterface:React.FC<Props> =()=>{
    // const persistedMessages = localStorage.getItem("messages")
    // const messages = persistedMessages ? JSON.parse(persistedMessages) : []
    const isMobile = useMediaQuery("(max-width:768px)");
    const [messages, setMessages] = useState<Message[]>([])
    const [aiData, setAidata] = useState()
   const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)
    const fectchMessasges =async()=>{
        try{
            const response = await fetch("/sampleData.json")
        const data = await response.json()
        setAidata(data)
        }
        catch{
         console.log("Fetch failed")
        }
    }  
    const onAskHandler = useCallback((prompt:string)=>{
       const askTime = format(new Date(), "dd MMM kk:mm aaa")
        const userMsgObj = {
            id : messages.length+1,
            from : "user",
            prompt: prompt,
            date: askTime
         }
         setMessages(prev=>[...prev, userMsgObj])
        // const storedMSG = localStorage.getItem("messages");
        // if(storedMSG){
        //     setMessages(JSON.parse(storedMSG))
        // }

        timerId.current = setTimeout(()=>{
            const response = matchPrompt(prompt, aiData ||[])
            // const persistedMessages = localStorage.getItem("messages")
            // const storedmessages= persistedMessages ? JSON.parse(persistedMessages) : []
            const sentTime = format(new Date(), "dd MMM kk:mm aaa")
            const msgObj = {
               id : messages.length+2,
               from : "bot",
               prompt: response,
               date:sentTime,
               feedback: "",
               rating: 0
            }
            // storedmessages.push(msgObj)
            setMessages(prev=>[...prev, msgObj])
            // localStorage.setItem("messages", JSON.stringify(storedmessages))
        },500)
    }, [aiData, messages.length])
    const onSaveHandler =useCallback(()=>{
        localStorage.setItem("messages", JSON.stringify(messages))
    },[messages])
    useEffect(()=>{
        const storedMSG = localStorage.getItem("messages");
        if(storedMSG){
            setMessages(JSON.parse(storedMSG))
        }
        fectchMessasges()
        return ()=>{
            clearTimeout(timerId.current|| undefined)
        }
    },[])

    return (
     <>
     {messages.length>0 ?
     <>
      <ChatMessages messages={messages}/>
     </>: <BotIntro />}
     <ChatActions isMobile={isMobile} onAsk ={ onAskHandler} onSave ={onSaveHandler}/>
     </>

    );
}
export default ChatInterface;