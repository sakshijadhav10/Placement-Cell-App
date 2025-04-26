import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
  } from "@mui/material";
  import { useHistory } from "react-router-dom";
  
//   import isAuth, { userType } from "../lib/isAuth";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  const RecruiterNav = (props) => {
    const classes = useStyles();
    let history = useHistory();
  
    const handleClick = (location) => {
      console.log(location);
      history.push(location);
    };
  
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DYP Placement Cell
          </Typography>
          
              
                <Button color="inherit" onClick={() => handleClick("/home")}>
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
                <Button color="inherit" onClick={() => handleClick("/profile")}>
                  Profile
                </Button>
                <Button color="inherit" onClick={() => handleClick("/logout")}>
                  Logout
                </Button>
            
          
        </Toolbar>
      </AppBar>
    );
  };
  
  export default RecruiterNav;