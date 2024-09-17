import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./App.css"

interface ModalProps{
    children? : ReactNode,
    className?: string,
    onClose?: ()=>void
}

const BackDrop:React.FC<ModalProps> =({onClose})=>{

    return (
        <div  className="backdrop" onClick={onClose}>

        </div>
    )
}

const ModalOverlay:React.FC<ModalProps> =({children})=>{

    return (
        
        <div className="modal">
            <div className="modal-content">
             {children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById("portal") ||null

const Modal:React.FC<ModalProps> =({children, onClose})=>{

return (
    <>
     {
        portalElement &&
        <>
        {createPortal(<BackDrop onClose={onClose}/>, portalElement)}
        {createPortal(<><ModalOverlay>{children}</ModalOverlay></>, portalElement)}
        </>
     }

    </>
);
}
export default Modal