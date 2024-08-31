import { Stack, Typography, Box, useTheme } from "@mui/material";
import botLogo from "./assets/botLogo.png";
import useMediaQuery from '@mui/material/useMediaQuery';

const BotIntro = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery('(max-width:768px)');
  type Query = {
    prompt: string;
    response: string;
  };
  const queries: Query[] = [
    {
      prompt: "Hi, what is the weather",
      response: "Get immediate AI generated response",
    },
    {
      prompt: "Hi, what is my location",
      response: "Get immediate AI generated response",
    },
    {
        prompt: "Hi, what is the temperature",
        response: "Get immediate AI generated response",
      },
    {
      prompt: "Hi, how are you",
      response: "Get immediate AI generated response",
    },
  ];

  return (
    <Stack
      justifyContent={"center"}
    >
     {!isMobile  && <>
      <Box  my={5.5} textAlign={"center"}>
        <Typography variant="h2"> How Can I Help You Today?</Typography>
        <Box
          component="img"
          src={botLogo}
          sx={{ width: "69px", height: "69px", boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.15)'
          }}
        ></Box>
      </Box>
      <Stack flexWrap={"wrap"} direction={{sm:"column", md:"row"}} rowGap={2} justifyContent={"space-around"} alignItems={"center"}>
        {queries.map((query, index)=>
        <Box key={index} sx={{width:"490px", height:"111px", background:theme.palette.background.paper, }} borderRadius={"5px"}>
            <Typography p={2} variant="h3" color={theme.palette.text.primary} sx={{fontWeight:"700"}}>{query.prompt} </Typography>
            <Typography pl={2} variant="h3" color={theme.palette.text.secondary} sx={{fontSize:"1rem"}}>{query.response}</Typography>
        </Box>
        )}
      </Stack>
     </>}
     {isMobile && <>
      <Box  mt={17} textAlign={"center"}>
        <Typography variant="h2"> How Can I Help You Today?</Typography>
        <Box
          component="img"
          src={botLogo}
          sx={{ width: "69px", height: "69px", boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.15)'
          }}
        ></Box>
      </Box>
      <Stack flexWrap={"wrap"} mt={24.2} direction={{sm:"column", md:"row"}} rowGap={1} justifyContent={"space-around"} alignItems={"center"}>
        {queries.map((query, index)=>
        index<queries.length-1 &&<Box key={index} sx={{width:"355px", height:"111px", background:theme.palette.background.paper, }} borderRadius={"5px"}>
        <Typography p={2} variant="h3" color={theme.palette.text.primary} sx={{fontWeight:"700"}}>{query.prompt} </Typography>
        <Typography pl={2} variant="h3" color={theme.palette.text.secondary} sx={{fontSize:"1rem"}}>{query.response}</Typography>
    </Box>
        )}
      </Stack>
     </>}
    </Stack>
  );
};

export default BotIntro;
