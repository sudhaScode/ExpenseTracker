import { Stack } from "@mui/material"
import styles from "../css_modules/ChatInterface.module.css";
import ChatMessage from "./ChatMessage"
import { useEffect, useRef, useState } from "react";

interface Message{
    id: number
    from:string
    prompt:string
    date:string
    feedback?: string | null
    rating?: number
}
// type Messages = Message[]

interface Props {
    messages: Message[]
} 
const ChatMessages:React.FC<Props>=({messages})=>{
    const [msgs, setMSGS] = useState<Message[]>([])
    const scrollRef = useRef<HTMLDivElement | null>(null)

useEffect(()=>{
    setMSGS(messages)
    // console.log("changed must re rereder ", messages)
   if(scrollRef.current ){
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
   }
},[messages])

    return (
        <Stack direction={"column"} height={"75%"} className={styles.interface}>
                    {msgs && msgs.map((message, index) => <ChatMessage message={message} index={index} key={index} messages={msgs} />)}
         <div ref={scrollRef}></div>
        </Stack>
    )

}

export default ChatMessages