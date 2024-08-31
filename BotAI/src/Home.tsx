import {
  Container,
  Stack,
  useMediaQuery,
  IconButton,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import ActiveChat from "./components/ActiveChat";
import ChatInterface from "./pages/ChatInterface";
import HistoryInterface from "./pages/HistoryInterface";
import styles from "./css_modules/Home.module.css"

interface Props {
  name: string;
}

const Home: React.FC<Props> = ({ name }) => {
  const theme = useTheme();
  const [isPastConversations, setPastConversations] = useState(false)
  const isMobile = useMediaQuery("(max-width:768px)");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <Stack sx={{ width: "100%" }} direction={"row"}>
      {!isMobile && (
        <Stack
          sx={{ backgroundColor: theme.palette.secondary.light, width: "20%" }}
        >
          <ActiveChat name={"New Chat"} isMobile={isMobile} setPastConversations={()=>setPastConversations(false)}/>
          <Button variant="contained" onClick={()=>setPastConversations(true)}>Past Conversations</Button>
        </Stack>
      )}
      <Container
        sx={{
          width: isMobile ? "100%" : "80%",
          background: theme.palette.primary.light,
        }}
        maxWidth="lg"
        disableGutters={true}
      >
        {isMobile && <>    
        <Stack direction={"row"} width={"50%"}>
          {menuOpen && (
            <Stack
              direction={"column"}
              alignItems={"flex-end"}
              className={menuOpen?`${styles.sidebar} ${styles.sidebar}`:styles.sidebar}
              sx={{
                position: "absolute",
                top: 0,
                width: "60%",
                height: "100%",
                zIndex: 9999,
                backgroundColor:theme.palette.secondary.main
              }}
            >
              <IconButton onClick={() => setMenuOpen(false)}>
                <CloseIcon sx={{ width: "35px", height: "35px" }} />
              </IconButton>
              <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                sx={{ width: "100%", height: "100%" }}
                gap={1}
              >
                <ActiveChat name={"New Chat"} isMobile={isMobile} setPastConversations={()=>setPastConversations(false)} />
                <Button variant="text" sx={{width:"fit-content", margin:"0", fontSize:"1.2rem", fontWeight:"800"}} onClick={()=>setPastConversations(true)}>Past Conversations</Button>
              </Stack>
            </Stack>
          )}
            <IconButton onClick={() => setMenuOpen(true)}>
              <MenuIcon sx={{ width: "40px", height: "40px" }} />
            </IconButton>
            <Typography
            ml={isMobile ? 1 : 3}
            my={isMobile ? 2 : 1}
            variant="h2"
            sx={{
              color: "#9785BA",
              borderRadius: "10px 10px 0 0",
              fontWeight: "700",
              fontSize: "28px",
            }}
          >
            {name}
          </Typography>
        </Stack> </>}
        {isPastConversations ?<HistoryInterface onBack={()=>setPastConversations(false)} />: <ChatInterface />}
      </Container>
    </Stack>
    </>
  );
};
export default Home;
