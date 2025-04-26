import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

import FileUploadInput from "../lib/FileUploadInput";
<<<<<<< HEAD
import DescriptionIcon from "@mui/icons-material/Description";
import FaceIcon from "@mui/icons-material/Face";
=======
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import InputAdornment from '@material-ui/core/InputAdornment';
>>>>>>> 306fa941cf03632aca14bfd1f244fea05648ef86

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";


const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "400px",
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    domain: "",
    CGPA: "",
    Percentage: "",
    year: "",
    contactnumber: "",
    address: "",
    resumeLink: "",
    profileLink: "",
  });
  const [phone, setPhone] = useState("");

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber);
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editDetails = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log(education);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };
    if (phone !== "") {
      updatedDetails = {
        ...profileDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...profileDetails,
        contactNumber: "",
      };
    }

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Profile</Typography>
        </Grid>
        <Grid item xs>
          <Paper
            style={{
              padding: "20px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container direction="column" alignItems="stretch" spacing={3}>
              <Grid item>
                <TextField
                  label="Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="CGPA"
                  value={profileDetails.CGPA}
                  onChange={(event) => handleInput("CGPA", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Percentage"
                  value={profileDetails.Percentage}
                  onChange={(event) =>
                    handleInput("Percentage", event.target.value)
                  }
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
<<<<<<< HEAD
              <Grid item>
                <TextField
                  select
                  label="Domain"
                  variant="outlined"
=======
              {/* <Grid item>
                <FileUploadInput
>>>>>>> 306fa941cf03632aca14bfd1f244fea05648ef86
                  className={classes.inputBox}
                  value={profileDetails.domain}
                  onChange={(event) => handleInput("domain", event.target.value)}
                >
                  <MenuItem value="Web Development">Web Development</MenuItem>
                  <MenuItem value="Cyber Security">Cyber Security</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                  <MenuItem value="AI & ML">AI & ML</MenuItem>
                  <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
                  <MenuItem value="DevOps">DevOps</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Year"
                  select
                  variant="outlined"
                  className={classes.inputBox}
                  value={profileDetails.year}
                  onChange={(event) => handleInput("year", event.target.value)}
                >
                  <MenuItem value="First-Year-A">FY-A</MenuItem>
                  <MenuItem value="First-Year-B">FY-B</MenuItem>
                  <MenuItem value="First-Year-C">FY-C</MenuItem>
                  <MenuItem value="First-Year-D">FY-D</MenuItem>
                  <MenuItem value="Second-Year-A">SY-A</MenuItem>
                  <MenuItem value="Second-Year-B">SY-B</MenuItem>
                  <MenuItem value="Second-Year-C">SY-C</MenuItem>
                  <MenuItem value="Third-Year-A">TY-A</MenuItem>
                  <MenuItem value="Third-Year-B">TY-B</MenuItem>
                  <MenuItem value="Third-Year-C">TY-C</MenuItem>
                  <MenuItem value="Fourth-Year-A">BTech-A</MenuItem>
                  <MenuItem value="Fourth-Year-B">BTech-B</MenuItem>
                  <MenuItem value="Fourth-Year-C">BTech-C</MenuItem>
                </TextField>
              </Grid>
              <MultifieldInput education={education} setEducation={setEducation} />
              <Grid item>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={profileDetails.skills}
                  onChange={(event, newValue) =>
                    setProfileDetails({ ...profileDetails, skills: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      variant="outlined"
                      className={classes.inputBox}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={editDetails}
                  variant="contained"
                  color="primary"
                  style={{ width: "250px" }}
                >
                  Edit Details
                </Button>
              </Grid>
<<<<<<< HEAD
=======
              <Grid item> */}
                               <Grid item>
                <TextField
                  className={classes.inputBox}
                  label="Resume Link (.pdf)"
                  variant="outlined"
                  fullWidth
                  // name="resume"
                  value={profileDetails.resumeLink}
                  onChange={(event) => handleInput("resumeLink", event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item>
                <TextField
                  className={classes.inputBox}
                  label="Profile Photo Link (.jpg/.png)"
                  variant="outlined"
                  fullWidth
                  // name="profile"
                  value={profileDetails.profileLink}
                  onChange={(event) => handleInput("profileLink", event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaceIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
                          <Grid item>
          <TextField
            label="Address"
            multiline
            rows={4}
            className={classes.inputBox}
            variant="outlined"
            value={profileDetails.address}
            onChange={(event) => handleInput("address", event.target.value)}
          />
        </Grid>
>>>>>>> 306fa941cf03632aca14bfd1f244fea05648ef86
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
