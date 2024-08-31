import Home from "./Home";
import "./App.css"
import {  Stack} from "@mui/material";
import { useEffect } from "react";




function App (){


useEffect(()=>{
  const saveHandler=(event: { returnValue: string; })=>{
  
     const message = 'You have unsaved changes. Please click on Save to persist coversation';
     event.returnValue = message;
     return message;
}

  window.addEventListener("beforeunload", saveHandler, false)
  return ()=>{
    window.removeEventListener("beforeunload", saveHandler, false)
  }
},[])

  return (
    <Stack flexDirection={"row"} sx= {{background: "#F2EEF8", width:"100vw", height: "100vh"}}>
        <Home name="Bot AI"/>
    </Stack>
  )
}

export default App;