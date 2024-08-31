import { Container } from "@mui/material"
import React, { ReactNode } from "react"
import ReactDOM from "react-dom"

interface Props {
    className : string
    children : ReactNode
    // onClose: ()=>void
    // onSubmit:(feedback:string)=>void
}

const Backdrop:React.FC =()=>{

    return(
       <Container disableGutters={true} sx={{position:"absolute",top:0,left:0, zIndex:8888, width:"100vw", height:"100vh", backgroundColor:"rgba(255, 255, 255, 0.726)"}}>
       </Container>
    )
}

const  ModalOverlay:React.FC<Props> =({children, className})=>{

    return(
       <Container disableGutters={true}  className={className} sx={{position:"absolute",top:"20%", left:"25%", zIndex:9999,border:"1px solid #00000073",borderRadius:"10px", boxShadow:" -4px 4px 10px 0px #00000040"
       }}>
          {children}
       </Container>
    )
}
const portalElement = document.getElementById("overlays");
const Modal:React.FC<Props>=({children, className})=>{
    return (
        <>
        {
            portalElement &&<>
                    {ReactDOM.createPortal(<Backdrop/>, portalElement)}
                    {ReactDOM.createPortal(<ModalOverlay className={className}>{children}</ModalOverlay>, portalElement)}
            </>
        }
        </>
    )
}
export  default Modal