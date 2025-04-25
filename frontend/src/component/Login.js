import React, { useContext, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  Paper,
  Link,
} from "@material-ui/core";
import { FcGoogle } from "react-icons/fc"; // For Google icon
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";


const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
    marginTop: "10px",
    backgroundColor: "#ffffff",
    color: "#3242ef",
    border: "1px solid #dddddd",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  googleIcon: {
    marginRight: theme.spacing(1),
  },
  signupText: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("name", response.data.name);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  const googleAuth = () => {
    window.open("http://localhost:4444/auth/google/callback", "_self");
  
    fetch("http://localhost:4444/auth/login/success", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("type", data.user.type);
          localStorage.setItem("name", data.user.name);
          setLoggedin(true); // Update state
        }
      })
      .catch((err) => console.log(err));
  };
  

  return loggedin ? (
   
      <Redirect to="/" />
    
 
    )  : (
    <Paper elevation={3} className={classes.body}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Login
          </Typography>
        </Grid>
        <Grid item>
          <EmailInput
            label="Email"
            value={loginDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <PasswordInput
            label="Password"
            value={loginDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
          />
        </Grid>
        <NavLink to='/forgot-password'>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            
            className={classes.submitButton}
          >
            Forget Password
          </Button>
        </Grid>
        </NavLink>
       
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            className={classes.submitButton}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={googleAuth}
            className={classes.googleButton}
            startIcon={<FcGoogle className={classes.googleIcon} />}
          >
            Sign in with Google
          </Button>
        </Grid>
        <Typography className={classes.signupText}>
          New here?{" "}
          <Link component={RouterLink} to="/signup" color="primary">
            Sign up
          </Link>
        </Typography>
      </Grid>
    </Paper>
  )}

export default Login;