import React from "react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { loginStyles } from "./Styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import Datacontext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Profile1 from "../assets/Profile1.png";
import Profile2 from "../assets/Profile2.png";
import Profile3 from "../assets/Profile3.png";

export const Login = () => {
  const { activeUser, setActiveUser } = useContext(Datacontext);
  // console.log(activeUser);
  const navigate = useNavigate();
  return (
    <Paper sx={loginStyles.loginPaper} elevation={5}>
      <Typography variant="h5" py={5}>
        Whose Login Here
      </Typography>
      <Stack sx={loginStyles.allusersContainer}>
        <Paper
          sx={loginStyles.userContainer}
          elevation={7}
          onClick={() => {
            setActiveUser("User 1");
            navigate("/");
          }}
        >
          <IconButton size="large">
            <Box
              component={"img"}
              src={Profile1}
              sx={{ width: "75px", height: "75px" }}
            />
          </IconButton>
          <Typography variant="body1">User 1</Typography>
        </Paper>
        <Paper
          sx={loginStyles.userContainer}
          elevation={7}
          onClick={() => {
            setActiveUser("User 2");
            navigate("/");
          }}
        >
          <IconButton size="large">
            <Box
              component={"img"}
              src={Profile2}
              sx={{ width: "75px", height: "75px" }}
            />
          </IconButton>
          <Typography variant="body1">User 2</Typography>
        </Paper>
        <Paper
          sx={loginStyles.userContainer}
          elevation={7}
          onClick={() => {
            setActiveUser("User 3");
            navigate("/");
          }}
        >
          <IconButton size="large">
            <Box
              component={"img"}
              src={Profile3}
              sx={{ width: "75px", height: "75px" }}
            />
          </IconButton>
          <Typography variant="body1">User 3</Typography>
        </Paper>
      </Stack>
    </Paper>
  );
};
