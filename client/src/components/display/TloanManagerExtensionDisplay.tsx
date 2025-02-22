import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Popper,
  styled,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { GetDetails }from "../../api/TLoanDB"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneIcon from "@mui/icons-material/Done";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import config from "../../config/config";
import { Toast } from "../alerts/SweetAlert";
import TLoanRejectModalButton from "../modals/tloanRejectExtension";

const TLoanManagerDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState<any>([]);
  const [items, setItems] = useState([]);
  const [reasonField, setReasonField] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const { TLoanID } = useParams();
  console.log(TLoanID);
  useEffect(() => {
    setTableLoading(true);
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const results = await axios
        .get(`${config.baseURL}/tloans/${TLoanID}`)
        .then((data) => {
          setReasonField(data.data.Reason);
          setLoans(data.data);
          setTableLoading(false);
        });

      // setLoan(Object.e)
      console.log(results);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const returnitems = await axios.get(
        `${config.baseURL}/tloanitems/${TLoanID}`
      );

      setItems(returnitems.data);
      setTableLoading(false);
      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  console.log(items);
  interface GridCellExpandProps {
    value: string;
    width: number;
  }

  function isOverflown(element: Element): boolean {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps
  ) {
    const { width, value } = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };

    const handleMouseLeave = () => {
      setShowFullCell(false);
    };

    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }

      function handleKeyDown(nativeEvent: KeyboardEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          setShowFullCell(false);
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);

    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: "center",
          lineHeight: "24px",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: "100%",
            width,
            display: "block",
            position: "absolute",
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });

  function renderCellExpand(params: GridRenderCellParams<string>) {
    return (
      <GridCellExpand
        value={params.value || ""}
        width={params.colDef.computedWidth}
      />
    );
  }

  const ApproveLoan = async () => {
    setLoading(true);
    axios
      .put(`${config.baseURL}/tloan/approveExtension/${TLoanID}`)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: `Extension For TLoan #${TLoanID} Has Been Approved`,
          customClass: "swalpopup",
          timer: 2000,
          width: 700,
        });
        navigate("/tloan");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  };

  const columns: GridColDef[] = [
    {
      field: "ItemNo",
      headerName: "Item Number",
      flex: 10,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "BatchNo",
      headerName: "Batch Number",
      flex: 10,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 2,
      editable: false,
      type: "number",
      renderCell: renderCellExpand,
    },
  ];

  const getData = () => {
    return (
      <Box sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <h2 style={{ margin: 15 }}>TLoan Extension Request </h2>
            <Card>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // marginTop: 2,
                        // marginBottom: -5,
                        // marginLeft: -10,
                        color: "#063970",
                        fontWeight: "bold",
                      }}
                    >
                      <h2>TLoan {loans.TLoanID} </h2>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>Loan No.</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.TLoanID}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>Start Date:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.StartDate}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>End Date:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.EndDate}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Company Name:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.CompanyName}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Customer Email:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.CustomerEmail}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{ color: "#F70404" }}>Extend Loan By:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          <strong>{loans.ExtensionDuration} Days </strong>
                        </div>
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <DataGrid
                      loading={tableLoading}
                      sx={{ background: "white", fontSize: 16 }}
                      rows={items}
                      columns={columns}
                      editMode="row"
                      getRowId={(item) => item.ItemNo}
                      experimentalFeatures={{ newEditingApi: true }}
                      components={{
                        LoadingOverlay: LinearProgress,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      sx={{ display: "flex" }}
                      id="With normal TextField"
                      // label="Shipping Address"
                      multiline
                      rows={11.5}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={reasonField}
                      label="Reason For Extension"
                      variant="filled"
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    component="span"
                    sx={{
                      component: "span",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
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
                          width: 150,
                          height: 50,
                          borderRadius: 10,
                          paddingRight: 4,
                        }}
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate("/tloan")}
                      >
                        Back
                      </LoadingButton>
                    </motion.div>
                    <Box sx={{ float: "right", display: "flex" }}>
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
                            backgroundColor: "green",
                            width: 200,
                            height: 50,
                            borderRadius: 10,
                            marginRight: 5,
                            marginLeft: 4,
                          }}
                          loading={loading}
                          loadingPosition="end"
                          endIcon={<DoneIcon />}
                          onClick={ApproveLoan}
                        >
                          Approve
                        </LoadingButton>
                      </motion.div>
                      <TLoanRejectModalButton />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  };

  return <div>{getData()}</div>;
};

export default TLoanManagerDisplay;
