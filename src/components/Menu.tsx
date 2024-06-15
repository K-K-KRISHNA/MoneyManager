import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Typography } from "@mui/material";
import Datacontext from "../context/DataContext";
import Profile1 from "../assets/Profile1.png";
import Profile2 from "../assets/Profile2.png";
import Profile3 from "../assets/Profile3.png";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const currentUser = () => {
    switch (activeUser) {
      case "User 1":
        return Profile1;
      case "User 2":
        return Profile2;
      default:
        return Profile3;
    }
  };

  const { activeUser, setActiveUser } = useContext(Datacontext);
  // console.log(activeUser.charAt(activeUser.length - 1));
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box
          component={"img"}
          src={currentUser()}
          sx={{ width: "55px", height: "55px" }}
        />
        <Typography mx={2}>{activeUser}</Typography>
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
        {activeUser !== "User 1" && (
          <MenuItem
            onClick={() => {
              handleClose();
              setActiveUser("User 1");
            }}
          >
            <Box
              component={"img"}
              src={Profile1}
              sx={{ width: "55px", height: "55px" }}
            />
            <Typography mx={2}>User 1</Typography>
          </MenuItem>
        )}
        {activeUser !== "User 2" && (
          <MenuItem
            onClick={() => {
              handleClose();
              setActiveUser("User 2");
            }}
          >
            <Box
              component={"img"}
              src={Profile2}
              sx={{ width: "55px", height: "55px" }}
            />
            <Typography mx={2}>User 2</Typography>
          </MenuItem>
        )}
        {activeUser !== "User 3" && (
          <MenuItem
            onClick={() => {
              handleClose();
              setActiveUser("User 3");
            }}
          >
            <Box
              component={"img"}
              src={Profile3}
              sx={{ width: "55px", height: "55px" }}
            />
            <Typography mx={2}>User 3</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
