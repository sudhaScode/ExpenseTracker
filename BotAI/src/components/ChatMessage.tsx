import ChatCard from "../UI/ChatCard";
import styles from "../css_modules/ChatMessage.module.css";
import botImage from "../assets/botLogo.png";
import userImage from "../assets/userImg.png";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { memo, useState } from "react";
import likeIcon from "../assets/likeIcon.svg";
import dislikeIcon from "../assets/dislikeIcon.svg";
import Rating from "./RatingComponent";
import FeedbackModal from "./FeedbackModal";


interface Message {
  id: number;
  from: string;
  prompt: string;
  date: string;
  feedback?: string | null;
  rating?: number;
}
interface Props {
  index: number;
  message: Message;
  messages?: Message[]
}
interface MSGProps {
  message: Message;
  messages?: Message[] |[]
  isReadOnly?: boolean
}

export const BotMessage: React.FC<MSGProps> = memo(({ message, messages, isReadOnly }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [starShow, setStarShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const isMobile = useMediaQuery("(max-width:768px)")
  let modifiedMessages = messages ||  [];



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    message.feedback = event.currentTarget.feedback.value;
    setShowModal(false)
    modifiedMessages = modifiedMessages.map((msg)=>{
      if (msg.id === message.id){
       return  message
      }
      return msg
   })
  localStorage.setItem("messages", JSON.stringify(modifiedMessages))
  };
  const handleRateSubmit =(value:number)=>{
    message.rating=value
    modifiedMessages = modifiedMessages.map((msg)=>{
       if (msg.id === message.id){
        return  message
       }
       return msg
    })
    localStorage.setItem("messages", JSON.stringify(modifiedMessages))
  }

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{ marginLeft: "2rem", margin: "1rem 10px" }}
    >
      <Box
        component={"img"}
        src={botImage}
        alt="Bot AI"
        sx={{ width: "75px", height: "75px", borderRadius: "50%" }}
      ></Box>
      <Stack
        direction={"column"}
        sx={{ marginLeft: "1rem", fontSize: "1rem", display: "flex" }}
        width={"100%"}
        onMouseOver={() => {setShow(!isReadOnly) }}
        onMouseLeave={() => {setShow(false) }}
      >
        <Typography variant="h3" sx={{ fontWeight: "700" }}>
          {"Bot AI"}
        </Typography>
        <Typography variant="h3" mx={0.5} className={styles.input}>
          {message.prompt}
        </Typography>
        {(starShow )? (
          <Typography
            variant="h3"
            mx={0.5}
            sx={{
              marginTop: "0.5rem",
              color: theme.palette.secondary.dark,
              fontSize: "12px",
            }}
          >
            Rate this Response <Rating val ={message.rating || 0} onSet={handleRateSubmit} isReadOnly={false} />
          </Typography>
        ) : ""}
        {isReadOnly  ? <>
        <Stack direction={"row"}>
        {message.feedback && <Typography
        variant="h3"
        mx={0.5}
        sx={{
          marginTop: "0.5rem",
          color: theme.palette.text.primary,
          fontSize: "14px",
        }}><span style={{fontSize:"16px", color:"black"}}>Feedback:</span> {message.feedback}</Typography>}
         <Rating val ={message.rating || 0} onSet={handleRateSubmit} isReadOnly={true} />
        </Stack>
        </>
        : message.feedback &&
        <Typography
        variant="h3"
        mx={0.5}
        sx={{
          marginTop: "0.5rem",
          color: theme.palette.text.primary,
          fontSize: "12px",
        }}><span style={{fontSize:"16px", color:"black"}}>Feedback:</span> {message.feedback}</Typography>
         }
         
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h3"
            sx={{
              marginTop: "0.5rem",
              color: theme.palette.secondary.dark,
              fontSize: "15px",
            }}
          >
            {message.date}
          </Typography>

              <Stack direction={"row"} className={styles.stats}>
                <IconButton onClick={() => setStarShow(true)}>
                  <Box
                    component={"img"}
                    src={likeIcon}
                    alt="like"
                    width={"16px"}
                    height={"16px"}
                  ></Box>
                </IconButton>
                <IconButton
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Box
                    component={"img"}
                    src={dislikeIcon}
                    alt="like"
                    width={"16px"}
                    height={"16px"}
                  ></Box>
                </IconButton>
              </Stack>
        </Stack>
      </Stack>
      {showModal && !isReadOnly && <FeedbackModal toggleModal={()=>setShowModal(false)} handleSubmit={handleSubmit}/>}
    </Stack>
  );
});

export  const UserMessage: React.FC<MSGProps> = memo(({ message }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{ margin: "1rem 1.5rem" }}
    >
      <Box
        component={"img"}
        src={userImage}
        alt="Bot AI"
        sx={{ width: "59px", height: "55px", borderRadius: "50%" }}
      ></Box>
      <Stack
        direction={"column"}
        sx={{ marginLeft: "1rem", fontSize: "1rem", display: "flex" }}
        width={"100%"}
      >
        <Typography variant="h3" sx={{ fontWeight: "700" }}>
          {"You"}
        </Typography>
        <Typography variant="h3" mx={0.5} className={styles.input}>
          {message.prompt}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            marginTop: "0.5rem",
            color: theme.palette.secondary.dark,
            fontSize: "15px",
          }}
        >
          {message.date}
        </Typography>
      </Stack>
    </Stack>
  );
});

const ChatMessage: React.FC<Props> = ({ index, message, messages }) => {
  return (
    <ChatCard className={styles.message} key={`${index} ${message.id}`}>
      {message.from === "bot" ? (
        <BotMessage message={message} messages={messages}/>
      ) : (
        <UserMessage message={message} messages={[]} />
      )}
    </ChatCard>
  );
};
export default ChatMessage;
