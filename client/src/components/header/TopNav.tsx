import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeUser, selectName } from "../../app/reducers/CurrentUserSlice";
import {
  Close,
  Open,
  Reset,
  selectOpen,
} from "../../app/reducers/SidebarSlice";
import defaultprofile from "../../assets/defaultprofile.png";
import navbarbrand from "../../assets/navbarbrand.png";

const TopNav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isopen = useAppSelector(selectOpen);
  const username = useAppSelector(selectName);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    dispatch(removeUser());
    dispatch(Reset());
    localStorage.clear();
    navigate("/");
  };

  const toggleDrawer = () => {
    if (isopen) {
      dispatch(Close());
    } else {
      dispatch(Open());
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{
        onMouseLeave: handleMenuClose,
      }}
      sx={{ zIndex: 2000, marginTop: "25px" }}
    >
      <MenuItem
        sx={{ color: "#0A2540" }}
        onClick={() => {
          navigate("/profile");
        }}
      >
        <ListItemIcon sx={{ color: "#0A2540" }}>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontWeight: 500,
            fontSize: "15px",
            marginLeft: "-7px",
          }}
        >
          Profile
        </ListItemText>
      </MenuItem>

      <MenuItem
        sx={{ color: "#0A2540" }}
        onClick={() => {
          navigate("/settings");
        }}
      >
        <ListItemIcon sx={{ color: "#0A2540" }}>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontWeight: 500,
            fontSize: "15px",
            marginLeft: "-7px",
          }}
        >
          Settings
        </ListItemText>
      </MenuItem>

      <MenuItem
        sx={{ color: "#0A2540" }}
        onClick={() => {
          logout();
        }}
      >
        <ListItemIcon sx={{ color: "#0A2540" }}>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontWeight: 500,
            fontSize: "15px",
            marginLeft: "-7px",
          }}
        >
          Logout
        </ListItemText>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ zIndex: 2000, marginTop: "25px" }}
    >
      {localStorage.getItem("token") !== null ? (
        [
          <MenuItem
            sx={{ color: "#0A2540" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon sx={{ color: "#0A2540" }}>
              <NotificationsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "14px",
                marginLeft: "-7px",
              }}
            >
              Notifications
            </ListItemText>
          </MenuItem>,
          <MenuItem
            sx={{ color: "#0A2540" }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <ListItemIcon sx={{ color: "#0A2540" }}>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "14px",
                marginLeft: "-7px",
              }}
            >
              Profile
            </ListItemText>
          </MenuItem>,

          <MenuItem
            sx={{ color: "#0A2540" }}
            onClick={() => {
              navigate("/settings");
            }}
          >
            <ListItemIcon sx={{ color: "#0A2540" }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "14px",
                marginLeft: "-7px",
              }}
            >
              Settings
            </ListItemText>
          </MenuItem>,

          <MenuItem
            sx={{ color: "#0A2540" }}
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon sx={{ color: "#0A2540" }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "14px",
                marginLeft: "-7px",
              }}
            >
              Logout
            </ListItemText>
          </MenuItem>,
        ]
      ) : (
        <MenuItem
          sx={{ color: "#0A2540" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          <ListItemIcon sx={{ color: "#0A2540" }}>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: "14px",
              marginLeft: "-7px",
            }}
          >
            Login
          </ListItemText>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      {/* <Box sx={{ flexGrow: 1, zIndex: '1500' }}> */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "white", color: "#0a2540", width: "100%" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            {localStorage.getItem("token") !== null && <MenuIcon />}
          </IconButton>
          <a className="" href="/">
            <img alt="ISDN Logo" src={navbarbrand} width="130" height="40" />
          </a>
          {/* <Typography variant="h6" noWrap component="div">
            Leaptron
          </Typography> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", marginRight: "25px" } }}
          >
            {localStorage.getItem("token") === null ? (
              <a href="/login">
                <motion.button
                  className="mainbutton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </a>
            ) : (
              [
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <NotificationsIcon />
                  {/* <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge> */}
                </IconButton>,
                <div
                  className="navprofile flexcontainer"
                  style={{ flexDirection: "row" }}
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onMouseEnter={handleMenuOpen}
                  onMouseLeave={handleMenuClose}
                  color="inherit"
                >
                  <img
                    alt="Profile Photo"
                    src={defaultprofile}
                    width="30"
                    height="30"
                    style={{ marginRight: 10 }}
                  />
                  <p className="navprofilename">{username}</p>
                  {isMenuOpen ? (
                    <>
                      <KeyboardArrowUpIcon />
                      {renderMenu}
                      {/* {ProfileDropdown} */}
                    </>
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>,
              ]
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default TopNav;