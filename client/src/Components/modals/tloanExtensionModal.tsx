import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { extendSxProp } from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalButton = () => {
  const { TLoanID } = useParams();

  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");
  const [loan, setLoan] = useState("");
  const [tloanid, setLoanID] = useState("");
  const [extensionStatus, setExtensionStatus] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const loans = await axios.get(
        `http://localhost:5000/api/tloanid/${TLoanID}`
      );
      const extension = await axios.get(
        `http://localhost:5000/api//tloanExtensionStatus/${TLoanID}`
      );
      setLoan(loans.data[0].TLoanID);
      setExtensionStatus(extension.data[0].ExtensionStatus)
      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  console.log(extensionStatus)
  useEffect(() => {
    const loanNo = JSON.stringify(loan);
    setLoanID(loanNo);
  });

  console.log(tloanid);

  const submitExtension = (e) => {
    e.preventDefault();
    try {
      const results = axios
        .post(`http://localhost:5000/api/tloan/extension`, {
          tloanid,
          reason,
          duration,
        })
        .then(() => navigate("/tloan"));

      console.log(results);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  const handleDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };

  const buttonDecision = () =>{
    if(extensionStatus !== 'NIL') {
      return (
      <Button
      size="small"
      variant="contained"
      sx={{
        color: "white",
        backgroundColor: "#063970",
        width: 300,
        height: 50,
        borderRadius: 10,
      }}
      onClick={handleOpen}
      disabled
    >
      Apply For Extension
    </Button>
      )
    }else(extensionStatus === 'NIL'); {
      return(
        <motion.div
        className="animatable"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="small"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#063970",
            width: 300,
            height: 50,
            borderRadius: 10,
          }}
          onClick={handleOpen}
        >
          Apply For Extension
        </Button>
        {/* <form onSubmit={submitExtension}> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <>
              <h2
                style={{
                  color: "#063970",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Extension For Loan
              </h2>
  
              <FormControl sx={{ width: 150, marginLeft: 3, marginTop: 2 }}>
                <InputLabel>Extend By</InputLabel>
                <Select
                  id="outlined-basic"
                  value={duration}
                  onChange={handleDuration}
                  size="small"
                  label="Extend By"
                  required
                >
                  <MenuItem value="5">5 Days</MenuItem>
                  <MenuItem value="10">10 Days</MenuItem>
                  <MenuItem value="15">15 Days</MenuItem>
                  <MenuItem value="20">20 Days</MenuItem>
                  <MenuItem value="25">25 Days</MenuItem>
                  <MenuItem value="30">30 Days</MenuItem>
                </Select>
              </FormControl>
              {console.log(duration)}
  
              <TextField
                sx={{ width: 400, marginLeft: 3, marginTop: 2 }}
                multiline
                rows={5.2}
                label="Reason For Extension"
                required
                onChange={(e) => setReason(e.target.value)}
                
              />
  
              {console.log(reason)}
              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <motion.div
                  className="animatable"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#063970",
                      width: 100,
                      height: 35,
                      borderRadius: 10,
                      marginTop: 5,
                    }}
                    onClick={handleClose}
                  >
                    Back
                  </Button>
                </motion.div>
                <motion.div
                  className="animatable"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#063970",
                      width: 100,
                      height: 35,
                      borderRadius: 10,
                      marginTop: 5,
                    }}
                    type="submit"
                    onClick={submitExtension}
                  >
                    Submit
                  </Button>
                </motion.div>
              </Box>
            </>
          </Box>
        </Modal>
        {/* </form> */}
      </motion.div>
      )
    }
        
      
  }
  
  return (
    <>
    {buttonDecision()}
    </>
    
  );
};

export default ModalButton;