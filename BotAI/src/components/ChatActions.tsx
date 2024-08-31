import {  Button, Stack, TextField, useTheme } from "@mui/material";
import { useRef, useState } from "react";

interface Props{
   isMobile : boolean
   onAsk: (prompt:string)=>void
   onSave:()=>void
}

const ChatActions:React.FC<Props> =({isMobile, onAsk, onSave})=>{
const [message, setMessage] = useState("");
const inputRef = useRef(null)
const messageHandler=()=>{
   // const persistedMessages = localStorage.getItem("messages")
   // const messages= persistedMessages ? JSON.parse(persistedMessages) : []
   // const msgObj = {
   //    id : messages.length+1,
   //    from : "user",
   //    prompt: message,
   //    date:"",
   // }
   // messages.push(msgObj)k
   setMessage('')
   // localStorage.setItem("messages", JSON.stringify(messages))
   onAsk(message)
}

const theme = useTheme()
    return(
        <Stack direction={"row"} justifyContent={"space-around"} alignItems={"center"} my={4}>
            <TextField inputRef={inputRef} value={message} onChange={((event)=>setMessage(event.target.value))} variant="outlined" sx={{marginLeft:isMobile?"10px":"", width:isMobile?"60%":"75%", height:"41px" ,background:theme.palette.secondary.light}} size="small"  multiline />
            <Button onClick={messageHandler} variant="contained" sx={{backgroundColor:theme.palette.secondary.main, height:"38px", color:theme.palette.text.primary, border:"none" }} >
               Ask
            </Button>
            <Button onClick={onSave}variant="contained" sx={{backgroundColor:theme.palette.secondary.main, height:"38px", color:theme.palette.text.primary, border:"none"}}>
               Save
            </Button>
         </Stack>
    );
}

export default ChatActions 