import FormHelperText from "@material-ui/core/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { LoadingButton } from "@mui/lab";
import { Box, styled, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import dateFormat from "dateformat";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useAppSelector } from "../../app/hooks";
import { selectPermissions } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import config from "../../config/config";

function newtloan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [shipping, setShipping] = useState("");
  const [applicationdate, setADate] = useState("");
  const [duration, setDuration] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [collection, setCollection] = useState("");
  const [requireddate, setRDate] = useState("");
  const [dateForm, setDateForm] = useState("");
  const [typeError, setTypeError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [shippingError, setShippingError] = useState(false);
  const [collectionError, setCollectionError] = useState(false);
  const [typeErrorText, setTypeErrorText] = useState("");
  const [companyErrorText, setCompanyErrorText] = useState("");
  const [purposeErrorText, setPurposeErrorText] = useState("");
  const [durationErrorText, setDurationErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [collectionErrorText, setCollectionErrorText] = useState("");
  const [shippingErrorText, setShippingErrorText] = useState("");
  const [minDateStr, setMinDateStr] = useState("");
  const permissions = useAppSelector(selectPermissions);
  const ExternalApplication = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal+External)"
  );
  const InternalApplication = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal)"
  );

  useEffect(() => {
    if ((ExternalApplication || InternalApplication) !== true) {
      navigate("/403");
    }
  }, []);

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  }
  const itemStorage = localStorage.getItem("react-use-cart");
  const cartItems = JSON.parse(itemStorage).items;

  const newProduct = cartItems.map(
    ({ id, ItemNo, ItemName, BatchNo, WarehouseCode, quantity }) => ({
      BasketItemID: id,
      ItemNo,
      ItemName,
      BatchNo,
      WarehouseCode,
      Quantity: quantity,
    })
  );
  const { updateItemQuantity, removeItem, emptyCart } = useCart();
  const minimumDate: any = new Date(
    new Date().getTime() + 10 * 24 * 60 * 60 * 1000
  );
  const minimumDateString = minimumDate.toString();
  useEffect(() => {
    const correctFormat = dateFormat(minimumDateString, "yyyy-mm-dd");
    setMinDateStr(correctFormat);
  });
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  useEffect(() => {
    if (cartItems === []) {
      return console.log("Nothing in cart");
    }
    setRows(cartItems);
  }, [cartItems]);

  const FullFeaturedCrudGrid = () => {
    const handleRowEditStart = (
      params: GridRowParams,
      event: MuiEvent<React.SyntheticEvent>
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
      params,
      event
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
      setRows(rows.filter((row) => row.id === id && removeItem(row.id)));
    };
    const handleMinusClick = (id: GridRowId) => () => {
      setRows(
        rows.filter(
          (row) => row.id === id && updateItemQuantity(row.id, row.quantity - 1)
        )
      );
    };
    const handleAddClick = (id: GridRowId) => () => {
      setRows(
        rows.filter(
          (row) => row.id === id && updateItemQuantity(row.id, row.quantity + 1)
        )
      );
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow!.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

      return updatedRow;
    };

    const columns: GridColumns = [
      { field: "ItemNo", headerName: "Item No.", flex: 8, editable: false },
      {
        field: "ItemName",
        headerName: "Item Name",
        flex: 8,
        editable: false,
      },
      {
        field: "BatchNo",
        headerName: "Batch No.",
        flex: 8,
        editable: false,
      },
      {
        field: "WarehouseCode",
        headerName: "Warehouse Code",
        flex: 2,
        editable: false,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 2,
        type: "number",
        editable: true,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        flex: 2,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <Tooltip title="Increase">
              <GridActionsCellItem
                icon={<RemoveIcon style={{ color: "red" }} />}
                label="Edit"
                className="textPrimary"
                onClick={handleMinusClick(id)}
                color="inherit"
              />
            </Tooltip>,
            <Tooltip title="Reduce">
              <GridActionsCellItem
                icon={<AddIcon style={{ color: "green" }} />}
                label="Edit"
                className="textPrimary"
                onClick={handleAddClick(id)}
                color="inherit"
              />
            </Tooltip>,
            <Tooltip title="Remove">
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        },
      },
    ];

    const StyledGridOverlay = styled("div")(({ theme }) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      "& .ant-empty-img-1": {
        fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
      },
      "& .ant-empty-img-2": {
        fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
      },
      "& .ant-empty-img-3": {
        fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
      },
      "& .ant-empty-img-4": {
        fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
      },
      "& .ant-empty-img-5": {
        fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
        fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
      },
    }));

    const CustomNoRowsOverlay = () => {
      return (
        <StyledGridOverlay>
          <svg
            width="120"
            height="100"
            viewBox="0 0 184 152"
            aria-hidden
            focusable="false"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(24 31.67)">
                <ellipse
                  className="ant-empty-img-5"
                  cx="67.797"
                  cy="106.89"
                  rx="67.797"
                  ry="12.668"
                />
                <path
                  className="ant-empty-img-1"
                  d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                />
                <path
                  className="ant-empty-img-2"
                  d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                />
                <path
                  className="ant-empty-img-3"
                  d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                />
              </g>
              <path
                className="ant-empty-img-3"
                d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
              />
              <g
                className="ant-empty-img-4"
                transform="translate(149.65 15.383)"
              >
                <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
              </g>
            </g>
          </svg>
          <Box sx={{ mt: 1 }}>No Products Added</Box>
        </StyledGridOverlay>
      );
    };

    return (
      <Box
        sx={{
          height: 300,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
            NoResultsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    );
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(newProduct);
  }, [newProduct]);

  const handleChangeCompany = (event: SelectChangeEvent) => {
    setCompany(event.target.value);
  };

  const handleChangeDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setCompany("");
    setType(event.target.value);
  };

  const handleChangeCollection = (event: SelectChangeEvent) => {
    setShipping("");
    setCollection(event.target.value);
  };

  const handleChangeRequiredDate = (newValue: "") => {
    setDateForm(newValue);
  };

  useEffect(() => {
    const correctFormat = dateFormat(dateForm, "yyyy-mm-dd");
    setRDate(correctFormat);
  }, [dateForm]);

  const emailRegex = /^\S+@\S+\.\S+$/i;

  const submitLoan = (e) => {
    setSubmitLoading(true);
    e.preventDefault();
    setTypeError(false);
    setCompanyError(false);
    setPurposeError(false);
    setDurationError(false);
    setEmailError(false);
    setCollectionError(false);
    setShippingError(false);
    if (items.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Please add an item",
        customClass: "swalpopup",
        timer: 1500,
        width: 315,
      });
      setSubmitLoading(false);
    }
    if (type === "") {
      setTypeError(true);
      setTypeErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (company === "") {
      setCompanyError(true);
      setCompanyErrorText("Input required");
      setSubmitLoading(false);
    }
    if (purpose === "") {
      setPurposeError(true);
      setPurposeErrorText("Required");
      setSubmitLoading(false);
    }
    if (duration === "") {
      setDurationError(true);
      setDurationErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (requireddate === "") {
      setSubmitLoading(false);
    } else if (requireddate < minDateStr === true) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Your Required Date",
        customClass: "swalpopup",
        timer: 2000,
        width: 315,
      });
      setSubmitLoading(false);
    }
    if (email === "") {
      setEmailError(true);
      setEmailErrorText("Required");
      setSubmitLoading(false);
    } else if (!email.match(emailRegex)) {
      setEmailError(true);
      setEmailErrorText("Invalid Email");
      setSubmitLoading(false);
    }
    if (collection === "") {
      setCollectionError(true);
      setCollectionErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (shipping === "") {
      setShippingError(true);
      setShippingErrorText("Required");
      setSubmitLoading(false);
    }
    if (
      type === "2" &&
      (company === "1" ||
        company === "2" ||
        company === "3" ||
        company === "4" ||
        company === "5" ||
        company === "6")
    ) {
      setCompanyError(true);
      setCompanyErrorText("Valid Input Required");
      setSubmitLoading(false);
    }
    if (
      type === "1" &&
      company !== "1" &&
      company !== "2" &&
      company !== "3" &&
      company !== "4" &&
      company !== "5" &&
      company !== "6"
    ) {
      setCompanyError(true);
      setCompanyErrorText("Input Required");
      setSubmitLoading(false);
    }
    if (
      items.length !== 0 &&
      type !== "" &&
      company !== "" &&
      purpose !== "" &&
      duration !== "" &&
      requireddate !== "" &&
      email !== "" &&
      email.match(emailRegex) &&
      collection !== "" &&
      shipping !== ""
    ) {
      try {
        const results = axios
          .post(`${config.baseURL}/tloan/newloan`, {
            type,
            company,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            user,
            email,
            collection,
            shipping,
            items,
          })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "TLoan Successfully Submitted",
              customClass: "swalpopup",
              timer: 1500,
              width: 700,
            });
            navigate("/tloan");
            emptyCart();
          });

        console.log(results);
      } catch (error) {
        console.log(error.response);
        setSubmitLoading(false);
      }
    }
  };

  const DraftLoan = (e) => {
    setLoading(true);
    e.preventDefault();
    setTypeError(false);
    setCompanyError(false);
    setPurposeError(false);
    setDurationError(false);
    setEmailError(false);
    setCollectionError(false);
    setShippingError(false);
    if (items.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Please add an item",
        customClass: "swalpopup",
        timer: 1500,
        width: 315,
      });
      setLoading(false);
    }
    if (type === "") {
      setTypeError(true);
      setTypeErrorText("Selection required");
      setLoading(false);
    }
    if (company === "") {
      setCompanyError(true);
      setCompanyErrorText("Input required");
      setLoading(false);
    }
    if (purpose === "") {
      setPurposeError(true);
      setPurposeErrorText("Required");
      setLoading(false);
    }
    if (duration === "") {
      setDurationError(true);
      setDurationErrorText("Selection required");
      setLoading(false);
    }
    if (requireddate === "") {
      setLoading(false);
    } else if (requireddate < minDateStr === true) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Your Required Date",
        customClass: "swalpopup",
        timer: 2000,
        width: 315,
      });
      setLoading(false);
    }
    if (email === "") {
      setEmailError(true);
      setEmailErrorText("Required");
      setLoading(false);
    } else if (!email.match(emailRegex)) {
      setEmailError(true);
      setEmailErrorText("Invalid Email");
      setLoading(false);
    }
    if (collection === "") {
      setCollectionError(true);
      setCollectionErrorText("Selection required");
      setLoading(false);
    }
    if (shipping === "") {
      setShippingError(true);
      setShippingErrorText("Required");
      setLoading(false);
    }
    if (
      type === "2" &&
      (company === "1" ||
        company === "2" ||
        company === "3" ||
        company === "4" ||
        company === "5" ||
        company === "6")
    ) {
      setCompanyError(true);
      setCompanyErrorText("Valid Input Required");
      setLoading(false);
    }
    if (
      type === "1" &&
      company !== "1" &&
      company !== "2" &&
      company !== "3" &&
      company !== "4" &&
      company !== "5" &&
      company !== "6"
    ) {
      setCompanyError(true);
      setCompanyErrorText("Input Required");
      setLoading(false);
    }
    if (
      items.length !== 0 &&
      type !== "" &&
      company !== "" &&
      purpose !== "" &&
      duration !== "" &&
      requireddate !== "" &&
      email !== "" &&
      email.match(emailRegex) &&
      collection !== "" &&
      shipping !== ""
    ) {
      try {
        const results = axios
          .post(`${config.baseURL}/tloan/loanDrafting`, {
            type,
            company,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            user,
            email,
            collection,
            shipping,
            items,
          })
          .then(() => {
            Toast.fire({
              icon: "info",
              title: "TLoan has been put into Draft",
              customClass: "swalpopup",
              timer: 1500,
              width: 700,
            });
            navigate("/tloan");
            emptyCart();
          });

        console.log(results);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    const uid = localStorage.getItem("user_id");
    setUser(uid);
    setADate(date);
    const Employee = localStorage.getItem("username");
    setName(Employee);
  });

  useEffect(() => {
    if (collection === "Self-Collection") {
      setShipping("Self-Collection, No Address Needed");
    }
  });

  const TLoanTypeAccess = () => {
    if (ExternalApplication === true) {
      return (
        <FormControl sx={{ width: 200, marginLeft: 3 }}>
          <InputLabel>Loan Type</InputLabel>
          <Select
            id="filled-required"
            variant="filled"
            value={type}
            onChange={handleChangeType}
            label="Loan Type"
            size="small"
            onBlur={() => {
              setTypeError(false);
              setTypeErrorText("");
              if (type === "") {
                setTypeError(true);
                setTypeErrorText("Selection required");
              }
            }}
            error={typeError}
          >
            <MenuItem value="1">Internal</MenuItem>
            <MenuItem value="2">External</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d11919" }}>
            {typeErrorText}
          </FormHelperText>
        </FormControl>
      );
    }
    if (InternalApplication === true) {
      return (
        <FormControl sx={{ width: 200, marginLeft: 3 }}>
          <InputLabel>Loan Type</InputLabel>
          <Select
            id="filled-required"
            variant="filled"
            value={type}
            onChange={handleChangeType}
            label="Loan Type"
            size="small"
            onBlur={() => {
              setTypeError(false);
              setTypeErrorText("");
              if (type === "") {
                setTypeError(true);
                setTypeErrorText("Selection required");
              }
            }}
            error={typeError}
          >
            <MenuItem value="1">Internal</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d11919" }}>
            {typeErrorText}
          </FormHelperText>
        </FormControl>
      );
    }
    return null;
  };

  const ExternalOrInternal = () => {
    if (type === "1") {
      return (
        <FormControl sx={{ width: 200, marginLeft: 3 }}>
          <InputLabel>Company</InputLabel>
          <Select
            id="filled-required"
            variant="filled"
            value={company}
            onChange={handleChangeCompany}
            size="small"
            label="Company"
            onBlur={() => {
              setCompanyError(false);
              setCompanyErrorText("");
              if (company === "") {
                setCompanyError(true);
                setCompanyErrorText("Selection required");
              }
            }}
            error={companyError}
          >
            <MenuItem value="1">SERVO_LIVE</MenuItem>
            <MenuItem value="2">LEAPTRON_LIVE</MenuItem>
            <MenuItem value="3">DIRAK181025</MenuItem>
            <MenuItem value="4">PMC_LIVE</MenuItem>
            <MenuItem value="5">PORTWELL_LIVE</MenuItem>
            <MenuItem value="6">ALL</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d11919" }}>
            {companyErrorText}
          </FormHelperText>
        </FormControl>
      );
    }
    if (type === "2") {
      return (
        <TextField
          id="filled-required"
          variant="filled"
          label="Customer Company"
          size="small"
          name="customer Company"
          sx={{ marginLeft: 3 }}
          onBlur={() => {
            setCompanyError(false);
            setCompanyErrorText("");
            if (company === "") {
              setCompanyError(true);
              setCompanyErrorText("Required");
            }
          }}
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          error={companyError}
          helperText={companyErrorText}
        />
      );
    }
    return (
      <FormControl sx={{ width: 200, marginLeft: 3 }}>
        <InputLabel>Company</InputLabel>
        <Select
          disabled
          id="filled-required"
          variant="filled"
          value={company}
          onChange={handleChangeCompany}
          size="small"
          label="Company"
          onBlur={() => {
            setCompanyError(false);
            setCompanyErrorText("");
            if (company === "") {
              setCompanyError(true);
              setCompanyErrorText("Selection required");
            }
          }}
          error={companyError}
        >
          <MenuItem value="1">SERVO_LIVE</MenuItem>
          <MenuItem value="2">LEAPTRON_LIVE</MenuItem>
          <MenuItem value="3">DIRAK181025</MenuItem>
          <MenuItem value="4">PMC_LIVE</MenuItem>
          <MenuItem value="5">PORTWELL_LIVE</MenuItem>
          <MenuItem value="6">ALL</MenuItem>
        </Select>
        <FormHelperText sx={{ color: "#d11919" }}>
          {companyErrorText}
        </FormHelperText>
      </FormControl>
    );
  };

  const shippingInput = () => {
    if (collection === "Self-Collection") {
      return (
        <TextField
          sx={{ width: "50%", marginLeft: 2, marginTop: 2 }}
          multiline
          id="filled-required"
          variant="filled"
          rows={4}
          label="Shipping Address"
          value={shipping}
          onBlur={() => {
            setShippingError(false);
            setShippingErrorText("");
            if (shipping === "") {
              setShippingError(true);
              setShippingErrorText("Required");
            }
          }}
          onChange={(e) => setShipping(e.target.value)}
          error={shippingError}
          helperText={shippingErrorText}
          disabled
        />
      );
    }
    if (collection === "Delivery") {
      return (
        <TextField
          sx={{ width: "50%", marginLeft: 2, marginTop: 2 }}
          multiline
          id="filled-required"
          variant="filled"
          rows={4}
          label="Shipping Address"
          value={shipping}
          onBlur={() => {
            setShippingError(false);
            setShippingErrorText("");
            if (shipping === "") {
              setShippingError(true);
              setShippingErrorText("Required");
            }
          }}
          onChange={(e) => setShipping(e.target.value)}
          error={shippingError}
          helperText={shippingErrorText}
        />
      );
    }
    return (
      <TextField
        sx={{ width: "50%", marginLeft: 2, marginTop: 2 }}
        multiline
        id="filled-required"
        variant="filled"
        rows={4}
        label="Shipping Address"
        value={shipping}
        onBlur={() => {
          setShippingError(false);
          setShippingErrorText("");
          if (shipping === "") {
            setShippingError(true);
            setShippingErrorText("Required");
          }
        }}
        onChange={(e) => setShipping(e.target.value)}
        error={shippingError}
        helperText={shippingErrorText}
        disabled
      />
    );
  };

  const getCard = () => {
    const loanDuration = [
      { "1 Week": "7" },
      { "2 Weeks": "14" },
      { "3 Weeks": "21" },
      { "1 Month": "30" },
      { "2 Months": "60" },
      { "3 Months": "90" },
      { "4 Months": "120" },
      { "5 Months": "150" },
      { "6 Months": "180" },
      { "7 Months": "210" },
      { "8 Months": "240" },
      { "9 Months": "270" },
      { "10 Months": "300" },
      { "11 Months": "330" },
      { "12 Months": "365" },
    ];
    return (
      <Box>
        <Card
          sx={{
            width: "98%",
            height: "100%",
            m: 3,
          }}
        >
          <CardContent>
            <h2>Apply TLoan</h2>
            {FullFeaturedCrudGrid()}
            <form onSubmit={submitLoan} style={{ width: "100%" }}>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  paddingRight: 2,
                  paddingLeft: 2,
                }}
              >
                <TextField
                  id="filled-required"
                  label="Employee Name"
                  variant="filled"
                  size="small"
                  value={name}
                  disabled
                />

                <TextField
                  id="filled-required"
                  label="Customer Email"
                  variant="filled"
                  size="small"
                  name="customerEmail"
                  sx={{ marginLeft: 3 }}
                  onBlur={() => {
                    setEmailError(false);
                    setEmailErrorText("");
                    if (email === "") {
                      setEmailError(true);
                      setEmailErrorText("Required");
                    } else if (!email.match(emailRegex)) {
                      setEmailError(true);
                      setEmailErrorText("Invalid Email");
                    }
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={emailError}
                  helperText={emailErrorText}
                />
                {TLoanTypeAccess()}
                {ExternalOrInternal()}

                <FormControl sx={{ width: 200, marginLeft: 3 }}>
                  <InputLabel>Collection Type</InputLabel>
                  <Select
                    id="filled-required"
                    value={collection}
                    onChange={handleChangeCollection}
                    label="Collection Type"
                    size="small"
                    variant="filled"
                    onBlur={() => {
                      setCollectionError(false);
                      setCollectionErrorText("");
                      if (collection === "") {
                        setCollectionError(true);
                        setCollectionErrorText("Selection required");
                      }
                    }}
                    error={collectionError}
                  >
                    {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                    <MenuItem value="Self-Collection">Self-Collection</MenuItem>
                    <MenuItem value="Delivery">Delivery</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "#d11919" }}>
                    {collectionErrorText}
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ width: 200, marginLeft: 3 }}>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    id="filled-required"
                    value={duration}
                    onChange={handleChangeDuration}
                    variant="filled"
                    label="Duration"
                    size="small"
                    onBlur={() => {
                      setDurationError(false);
                      setDurationErrorText("");
                      if (duration === "") {
                        setDurationError(true);
                        setDurationErrorText("Selection required");
                      }
                    }}
                    error={durationError}
                  >
                    {loanDuration.map((element) => {
                      const [[key, val]] = Object.entries(element);
                      return (
                        <MenuItem value={val} key={key}>
                          {key}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText sx={{ color: "#d11919" }}>
                    {durationErrorText}
                  </FormHelperText>
                </FormControl>
                {/* Type */}
                <Box sx={{ width: 200, marginLeft: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack>
                      <DatePicker
                        label="Required Date"
                        inputFormat="yyyy-MM-dd"
                        value={dateForm}
                        onChange={handleChangeRequiredDate}
                        minDate={minimumDate}
                        inputProps={{
                          readOnly: true,
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="filled-required"
                            variant="filled"
                            size="small"
                            {...params}
                          />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box sx={{ display: "flex", paddingRight: 2 }}>
                <TextField
                  sx={{ width: "50%", marginLeft: 2, marginTop: 2 }}
                  multiline
                  id="filled-required"
                  variant="filled"
                  rows={4}
                  label="Purpose"
                  onBlur={() => {
                    setPurposeError(false);
                    setPurposeErrorText("");
                    if (purpose === "") {
                      setPurposeError(true);
                      setPurposeErrorText("Required");
                    }
                  }}
                  onChange={(e) => setPurpose(e.target.value)}
                  error={purposeError}
                  helperText={purposeErrorText}
                />
                {/* <TextField
                    sx={{ width: "50%", marginLeft: 2, marginTop: 2 }}
                    multiline
                    id="filled-required"
                    variant="filled"
                    rows={4}
                    label="Shipping Address"
                    onBlur={() => {
                      setShippingError(false);
                      setShippingErrorText("");
                      if (shipping === "") {
                        setShippingError(true);
                        setShippingErrorText("Required");
                      }
                    }}
                    onChange={(e) => setShipping(e.target.value)}
                    error={shippingError}
                    helperText={shippingErrorText}
                  /> */}
                {shippingInput()}
              </Box>
              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ paddingTop: 2 }}
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
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() => navigate(-2)}
                  >
                    Back
                  </LoadingButton>
                </motion.div>
                <Box display="flex">
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
                        width: 200,
                        height: 50,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                      loading={loading}
                      loadingPosition="end"
                      endIcon={<SaveAsIcon />}
                      onClick={DraftLoan}
                    >
                      Save as Draft
                    </LoadingButton>
                  </motion.div>
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
                        backgroundColor: "#31A961",
                        width: 200,
                        height: 50,
                        borderRadius: 10,
                      }}
                      loading={submitLoading}
                      loadingPosition="end"
                      endIcon={<DoneAllIcon />}
                      type="submit"
                      // onClick={submitLoan}
                    >
                      Submit
                    </LoadingButton>
                  </motion.div>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
  };
  return getCard();
}

export default newtloan;
