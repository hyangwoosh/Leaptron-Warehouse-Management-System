import FormHelperText from "@material-ui/core/FormHelperText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config/config";
import { Toast } from "../alerts/SweetAlert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  border: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalButton = () => {
  const { TLoanID } = useParams();

  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");
  const [loan, setLoan] = useState("");
  const [tloanid, setLoanID] = useState("");
  const [loading, setLoading] = useState(false);
  const [extensionStatus, setExtensionStatus] = useState("");
  const [tloanStatus, setTLoanStatus] = useState();
  const [reasonError, setReasonError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [reasonErrorText, setReasonErrorText] = useState("");
  const [durationErrorText, setDurationErrorText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const loans = await axios.get(
        `${config.baseURL}/tloanid/${TLoanID}`
      );
      const extension = await axios.get(
        `${config.baseURL}/tloanExtensionStatus/${TLoanID}`
      );
      const loanDetail = await axios.get(
        `${config.baseURL}/tloanstatusid/${TLoanID}`
      );
      setLoan(loans.data[0].TLoanID);
      setExtensionStatus(extension.data[0].ExtensionStatus);
      setTLoanStatus(loanDetail.data[0].TLoanStatusID);
      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  console.log(extensionStatus)

  console.log(extensionStatus);
  useEffect(() => {
    const loanNo = JSON.stringify(loan);
    setLoanID(loanNo);
  });

  console.log(tloanid);

  const submitExtension = (e) => {
    e.preventDefault();
    setLoading(true);
    setDurationError(false);
    setReasonError(false);
    if (reason === "") {
      setReasonError(true);
      setReasonErrorText("Input Is Needed");
      setLoading(false);
    }
    if (duration === "") {
      setDurationError(true);
      setDurationErrorText("Select An Option");
      setLoading(false);
    }
    if (reason !== "" && duration !== "") {
      setTimeout(() => {
        try {
          const results = axios
            .post(`${config.baseURL}/tloan/extension`, {
              tloanid,
              reason,
              duration,
            })
            .then(() => {
              Toast.fire({
                icon: "success",
                title: "TLoan Extension Successfully Applied",
                customClass: "swalpopup",
                timer: 1500,
                width: 700,
              });
              navigate("/tloan");
            });
        } catch (error) {
          setLoading(false);
          console.log(error.response);
        }
      }, 500);
    }
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  const handleDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };

  const buttonDecision = () => {
    if (
      tloanStatus === 1 ||
      tloanStatus === 2 ||
      tloanStatus === 4 ||
      tloanStatus === 8 ||
      tloanStatus === 9
    ) {
      return null;
    }
    if (extensionStatus !== "NIL") {
      return (
        <LoadingButton
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
        </LoadingButton>
      );
    }
    if (extensionStatus === "NIL") {
      return (
        <motion.div
          className="animatable"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <LoadingButton
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
          </LoadingButton>
          {/* <form onSubmit={submitExtension}> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
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
                    Extension For Loan #{TLoanID}
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
                    <FormHelperText sx={{ color: "#d11919" }}>
                      {durationErrorText}
                    </FormHelperText>
                  </FormControl>
                  {console.log(duration)}

                  <TextField
                    sx={{ width: 400, marginLeft: 3, marginTop: 2 }}
                    multiline
                    rows={5.2}
                    label="Reason For Extension"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    error={reasonError}
                    helperText={reasonErrorText}
                    required
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
                      <LoadingButton
                        size="small"
                        variant="contained"
                        sx={{
                          color: "white",
                          backgroundColor: "#063970",
                          width: 100,
                          height: 35,
                          borderRadius: 10,
                          marginTop: 5,
                          paddingRight: 4,
                        }}
                        onClick={handleClose}
                        startIcon={<ArrowBackIosNewIcon />}
                      >
                        Back
                      </LoadingButton>
                    </motion.div>
                    <motion.div
                      className="animatable"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <LoadingButton
                        size="small"
                        variant="contained"
                        sx={{
                          color: "white",
                          backgroundColor: "#31A961",
                          width: 100,
                          height: 35,
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                        type="submit"
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<DoneAllIcon />}
                        onClick={submitExtension}
                      >
                        Submit
                      </LoadingButton>
                    </motion.div>
                  </Box>
                </>
              </Box>
            </Fade>
          </Modal>
          {/* </form> */}
        </motion.div>
      );
    }
  };
  return <>{buttonDecision()}</>;
};

export default ModalButton;