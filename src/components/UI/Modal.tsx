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
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.77)'
          },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '538px', /* Adjust width as needed */
            background: 'rgba(239, 239, 239, 0.85)',
            border: 'none',
            borderRadius: '15px',
            height:isFor === "add-balance"?"164px":"300px",
            // padding: '20px',
            overflowY: "auto", // Enable scrolling if content exceeds height
            
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