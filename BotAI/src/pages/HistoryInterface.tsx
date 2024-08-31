import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Container, IconButton, Stack, Typography } from '@mui/material';
import FilterButton from '../components/FilterButton';
import { useEffect, useState } from 'react';
import ChatCard from '../UI/ChatCard';
import styles from "../css_modules/HistoryInterface.module.css"
import { BotMessage, UserMessage } from '../components/ChatMessage';

interface Message{
    id: number
    from:string
    prompt:string
    date:string
    feedback?: string | null
    rating?: number
}
type MessageHistory={
   bot: Message
   user: Message
}

interface Props{
    onBack: ()=>void
}
const HistoryInterface:React.FC<Props> =({onBack})=>{

    const [messages, setMessages] = useState<MessageHistory[]>()

    const reStrcuture =(filteredMessages:Message[])=>{
        const  messageHistory: MessageHistory[] = [];
        for (let i=0;i<filteredMessages.length;i +=2){
         if (filteredMessages[i].from === 'user' &&filteredMessages[i + 1]?.from === 'bot') {
             messageHistory.push({
                 user:filteredMessages[i],
                 bot:filteredMessages[i + 1]
             });
         }
        }
        return messageHistory;
    }
    const filterHandler =(pin: string)=>{
        const persistedMessages = localStorage.getItem("messages")
        const persisted:Message[] = persistedMessages? JSON.parse(persistedMessages):[]
        if(pin === "Filter"){
            const messageHistory = reStrcuture(persisted)
            setMessages(messageHistory)
            return
        }
        const rating:number = Number(pin.split(" ")[0])
        const messageHistory = reStrcuture(persisted)
        const filteredMessages =  messageHistory.filter(msg=> msg.bot.rating === rating)
        console.log(filteredMessages, rating)
        setMessages(filteredMessages)
    }

    useEffect(()=>{
        const persistedMessages = localStorage.getItem("messages")
        const persisted:Message[] = persistedMessages? JSON.parse(persistedMessages):[]
        const messageHistory = reStrcuture(persisted)
        setMessages(messageHistory)

    },[])

    return(
        <>
         <Typography variant='h3' textAlign={"center"} sx={{fontWeight:"700"}}>Conversation History  </Typography>
         <Stack direction={"row"} justifyContent={"space-between"} sx={{marginRight:"6rem"}}>
         <IconButton onClick={onBack}>
            <KeyboardBackspaceIcon/>
         </IconButton>
         <FilterButton onFilter={filterHandler} />
         </Stack>
        <Container sx={{marginBottom:"3rem", height:"80%", overflow:"auto"}} >
         <Typography variant='h3' textAlign={"left"} sx={{fontWeight:"500"}}>Today's Chats </Typography>
         {messages && messages.map((msg,index)=><>
            <ChatCard className={styles.message}>
                  <UserMessage message={msg.user} key= {index+msg.bot.id}/>
                  <BotMessage message={msg.bot} key={index+msg.bot.id} isReadOnly/>

            </ChatCard>
         </> )
         }
        </Container>
        </>
    )
}
export default HistoryInterface 