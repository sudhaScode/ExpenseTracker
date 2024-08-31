import ReactModal from 'react-modal';
import "../cssmodules/Modal.css";


interface ModalProps{
    children?: React.ReactNode;
    isOpened: boolean;
    isFor: string;
    handler: (state:boolean)=>void;

}

ReactModal.setAppElement("#overlays")

const Modal : React.FC<ModalProps>=({children, isOpened, handler, isFor})=>{
    const customStyles = {
       
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // width: '538px', /* Adjust width as needed */
            // background: 'rgba(239, 239, 239, 0.85)',
            // border: 'none',
            height:isFor === "add-balance"?"164px":"300px",
            // padding: '20px',
            width:"538px",
            background: 'rgba(239, 239, 239, 0.85)',
            borderRadius: "15px",   
        },
      };
    
    function closeModal() {
        handler(false)
    }
    return(
       <ReactModal isOpen={isOpened} onRequestClose={closeModal} style={customStyles}
       contentLabel="Crud Modal" >
              {children}
       </ReactModal>
    )

}

export default Modal;