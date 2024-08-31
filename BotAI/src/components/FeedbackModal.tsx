import { Box, Button, IconButton, Stack, styled, TextField, Typography, useMediaQuery } from "@mui/material";
import Modal from "../UI/Modal"
import insightIcon from "../assets/insightIcon.svg";
import styles from "../css_modules/ChatMessage.module.css";

interface Props{
    toggleModal: ()=>void
    handleSubmit:(event: React.FormEvent<HTMLFormElement>)=>void
}


const FeedbackModal:React.FC<Props> =({toggleModal, handleSubmit})=>{
    const isMobile = useMediaQuery("(max-width:768px)")

    const CustomTextField = styled(TextField)({
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E0E3E7",
            border: "none",
          },
        },
      });


    return (

        (
            <Modal className={styles.modal}>
              {/* onClose={modalCloseHandler} onSubmit={feedbackSubmit} */}
              <>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  marginTop={1}
                  marginRight={2}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"space-evenly"}
                    marginLeft={3}
                    marginTop={0.5}
                  >
                    <Box
                      component={"img"}
                      width={isMobile ?"20px":"40px"}
                      height={isMobile ?"20px":"42px"}
                      src={insightIcon}
                      alt="Info"
                    ></Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Open Sans",
                        color: "#000000",
                        fontSize: isMobile ?"11px":"22px",
                        padding: isMobile ?"6px":"16px",
                      }}
                    >
                      Provide Additional Feedback
                    </Typography>
                  </Stack>
                  <IconButton
                    onClick={toggleModal}
                    sx={{ width: "35px", height: "35px" }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Ubuntu",
                        color: "#000000",
                        fontWeight: "800",
                        fontSize: isMobile ?"20px":"28px",
                        textAlign: "left",
                      }}
                    >
                      X
                    </Typography>
                  </IconButton>
                </Stack>
                <form onSubmit={handleSubmit}>
                  <CustomTextField
                    required
                    name="feedback"
                    multiline
                    maxRows={7}
                    variant="outlined"
                    sx={{
                      width: "80%",
                      marginLeft: "10%",
                      height: "187px",
                      borderRadius: "10px",
                      border: "1px solid black",
                      background: "#FFFFFF",
                    }}
                  />
                  <Button
                   type="submit"
                    sx={{
                      marginLeft:isMobile ? "45%":"68%",
                      marginTop:isMobile ?"25px": "10px",
                      background: "#D7C7F4",
                      fontSize: "20px",
                      fontFamily: "Ubuntu",
                      fontWeight: "400",
                      color: "#000000",
                      width:isMobile ?"100px": "157px",
                      height: "50px",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </>
            </Modal>
          )
    )
}

export default FeedbackModal;