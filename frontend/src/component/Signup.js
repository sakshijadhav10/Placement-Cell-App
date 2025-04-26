import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Chip, Autocomplete } from '@mui/material';

const Signup = () => {
  const [userType, setUserType] = useState('student');
  const [educationFields, setEducationFields] = useState([{ domain: '', year: '', branch: '', cgpa: '' }]);
  const [skills, setSkills] = useState([]);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEducationChange = (index, event) => {
    const values = [...educationFields];
    values[index][event.target.name] = event.target.value;
    setEducationFields(values);
  };

  const handleAddEducationField = () => {
    setEducationFields([...educationFields, { domain: '', year: '', branch: '', cgpa: '' }]);
  };

  const handleRemoveEducationField = (index) => {
    const values = [...educationFields];
    values.splice(index, 1);
    setEducationFields(values);
  };

  const handleSkillsChange = (event, newSkills) => {
    setSkills(newSkills);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('Form submitted with:', { userType, educationFields, skills });
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit}>
      <div>
        <FormControl fullWidth>
          <InputLabel id="user-type-label">User Type</InputLabel>
          <Select
            labelId="user-type-label"
            value={userType}
            onChange={handleUserTypeChange}
            label="User Type"
=======
    <>
      {education.map((obj, key) => (
        <Grid
          item
          container
          className={classes.inputBox}
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
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
      <Grid item>
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
// };
const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    address:"",
    name: "",
    education: [],
    skills: [],
    domain:'',
    year:'',
    branch:'',
     CGPA:"",
     Percentage:"",
    resumeLink: "",
    profileLink: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    // contactNumber:{
    //   untouched:true,
    //   required:true,
    //   error:false,
    //   message:"",
    // },
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });
  
    let updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
      contactNumber: phone !== "" ? `+${phone}` : "",
    };
  
    setSignupDetails(updatedDetails);
  
    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });
  
    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("resumeLink",response.data.resumeLink)
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response?.data?.message || "Signup failed",
          });
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };
  

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(updatedDetails);

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("resumeLink", response.data.resumeLink);

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
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Paper elevation={3} className={classes.body}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Signup
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Category"
            variant="outlined"
            className={classes.inputBox}
            value={signupDetails.type}
            onChange={(event) => {
              handleInput("type", event.target.value);
            }}
>>>>>>> 306fa941cf03632aca14bfd1f244fea05648ef86
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
      </div>

      {userType === 'student' && (
        <div>
          <h3>Education Details</h3>
          {educationFields.map((field, index) => (
            <div key={index}>
              <TextField
                label="Domain"
                name="domain"
                value={field.domain}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Year"
                name="year"
                value={field.year}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Branch"
                name="branch"
                value={field.branch}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="CGPA"
                name="cgpa"
                value={field.cgpa}
                onChange={(e) => handleEducationChange(index, e)}
                fullWidth
                margin="normal"
              />
              {educationFields.length > 1 && (
                <Button onClick={() => handleRemoveEducationField(index)} color="secondary">
                  Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddEducationField} color="primary">
            Add Education
          </Button>
        </div>
      )}

      <div>
        <Autocomplete
          multiple
          id="skills-input"
          options={[]}
          freeSolo
          value={skills}
          onChange={handleSkillsChange}
          renderInput={(params) => <TextField {...params} label="Skills" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={index} />
            ))
          }
        />
      </div>

      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Signup;
