import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TableCell,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionMenuItem } from "../../utils/CommonTypes";

interface MenuProps {
  items: ActionMenuItem[];
}
const ActionMenu: React.FC<MenuProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <TableCell sx={{ color: "#0A2540" }} align="left">
      <Button
        sx={{ color: "#0A2540" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item, key) => [
          <MenuItem
            key={key} // eslint-disable-line react/no-array-index-key
            sx={{ color: item.delete ? "#D11A2A" : "#0A2540" }}
            onClick={() => {
              if (!item.delete) {
                navigate(item.url);
              } else {
                item.deleteFunction();
              }
            }}
          >
            <ListItemIcon sx={{ color: item.delete ? "#D11A2A" : "#0A2540" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
            >
              {item.name}
            </ListItemText>
          </MenuItem>,
        ])}
      </Menu>
    </TableCell>
  );
};
export default ActionMenu;
