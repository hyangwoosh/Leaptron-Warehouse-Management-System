import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import config from "../../config/config";

const style = {
  position: "absolute" as "absolute",
  height: "70%",
  width: "70%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "block",
};

interface rma {
  RejectReason: string;
}

export default function ReasonModalButton() {
  const { RmaID } = useParams();
  const navigate = useNavigate();
  const [rma, setRma] = useState<rma>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rma = await axios.get(`${config.baseURL}/RMA/${RmaID}`);

      setRma(rma.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <motion.div
      className="animatable"
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.9 }}
    >
      <LoadingButton
        size="small"
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#D11A2A",
          width: 200,
          height: 50,
          borderRadius: 10,
        }}
        endIcon={<VisibilityIcon/>}
        onClick={handleOpen}
      >
        View Reason
      </LoadingButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                marginLeft: 0,
                color: "#D11A2A",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              <h2>Reason for rejection</h2>
              <Box sx={{ height: "90%", color: "black", fontWeight: "normal" }}>
                {rma.RejectReason}
              </Box>
            </Typography>
            <Box
              component="span"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <motion.div
                className="animatable"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.9 }}
              >
                <LoadingButton
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                    paddingRight: 4,
                  }}
                  startIcon={<CloseIcon/>}
                  onClick={handleClose}
                >
                  Close
                </LoadingButton>
              </motion.div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </motion.div>
  );
}