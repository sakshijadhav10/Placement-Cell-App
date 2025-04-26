import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import isAuth, { userType } from "../lib/isAuth";
import apiList from "../lib/apiList";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  let history = useHistory();

//   const [ setUserName] = useState("");

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(apiList.signup, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUserName(response.name);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   if (isAuth()) fetchUser();
// }, []);
  const handleClick = (location) => {
    history.push(location);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    handleClick("/logout");
  };

  const handleProfile = () => {
    handleMenuClose();
    handleClick("/profile");
  };

  // Get the username from wherever it's stored (localStorage, JWT decode, etc.)
  const userName = localStorage.getItem("name") || "User";

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DYP Placement Cell
        </Typography>

        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                Drives
              </Button>
              <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </Button>
              <Button color="inherit" onClick={() => handleClick("/users")}>
                UsersInfo
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/applications")}>
                Applications
              </Button>
              <Button color="inherit" onClick={() => handleClick("/buildcv")}>
                BuildCV
              </Button>
              <Button color="inherit" onClick={() => handleClick("/dsa")}>
                DSA
              </Button>
              <Button color="inherit" onClick={() => handleClick("/apti")}>
                Aptitude
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}

        {isAuth() && (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              {/* <Avatar style={{ backgroundColor: "#3f51b5" }}>
                {userName.charAt(0).toUpperCase()}
              </Avatar> */}
              <Typography style={{ marginLeft: 8 }}>{userName}</Typography>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem disabled>Hello, {userName}</MenuItem>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
