import { Stack, Box, Typography, IconButton } from "@mui/material";
import newChatIcon from "../assets/newChat.svg"
import {useTheme} from "@mui/material";
import chatEditIcon from "../assets/editChat.svg";






interface Props {
    name: string
    isMobile :boolean
    setPastConversations?: ()=>void
}

const ActiveChat:React.FC <Props>=({name, isMobile, })=>{
    const theme = useTheme()

    return (
        <Stack direction={"row"} alignItems={ "center"} justifyContent={isMobile?"space-between":"space-around"} sx ={{backgroundColor:isMobile ?"":theme.palette.secondary.main, width:isMobile?"80%":"100%", height:"47px"}}>
          {!isMobile && <Box ml={1} component="img" src={newChatIcon}  width={{xs:30}} height={{xs:30}} sx={{borderRadius:"10px", boxShadow: '0px 4px 4px 0px #00000040'}}
          ></Box>}
          <Typography variant="h3" sx={{color:theme.palette.text.primary, fontWeight:"600", fontSize:isMobile?"1.3rem":"", marginLeft:isMobile?"10px":"20px"}} ml={1}>{name}</Typography>
          <IconButton>
            <img src={chatEditIcon}  alt="edit" />
          </IconButton>
             
        </Stack>
    );

}

export default ActiveChat;