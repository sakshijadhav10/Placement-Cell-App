import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@mui/material";


import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";
import DSA from "./component/DSA";
import Aptitude from "./component/Aptitude";
import BuildCV from "./component/BuildCV";
import ApplicantNav from "../src/component/ApplicantNav";
import RecruiterNav from "./component/RecruiterNav";
import UsersInfo from "./component/recruiter/UsersInfo";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("type", params.get("type"));
      localStorage.setItem("name", params.get("name"));
      localStorage.setItem("reumeLink", params.get("resumeLink"));
      window.history.replaceState(null, "", "/home"); // Remove token from URL
    }
  }, []);
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route exact path="/reset-password/:token">
                <ResetPassword />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/dsa">
                <DSA />
              </Route>
              <Route exact path="/apti">
                <Aptitude />
              </Route>
              <Route exact path="/buildcv">
                <BuildCV />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>

              <Route
                exact
                path="/profile"
                render={() =>
                  userType() === "recruiter" ? (
                    <RecruiterProfile />
                  ) : (
                    <Profile />
                  )
                }
              />
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>

              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>
              <Route exact path="/users">
                <UsersInfo />
              </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
