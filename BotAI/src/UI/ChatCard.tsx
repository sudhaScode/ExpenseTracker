import { Container } from "@mui/material";

import styles from "../css_modules/ChatCard.module.css";
import { ReactNode } from "react";

interface Props {
    className:string
    children:ReactNode
}

const ChatCard:React.FC<Props>=({className, children})=>{

    return (
        <Container className={className?`${styles.card} ${className}`:styles.card}  disableGutters={true}>
             {children}
        </Container>
    )
}

export default ChatCard ;