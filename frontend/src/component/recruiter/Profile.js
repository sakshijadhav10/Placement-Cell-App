import { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography, Paper, TextField } from "@mui/material";

import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";

const Profile = () => {
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

  const handleInput = (key, value) => {
    setProfileDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
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
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber || "");
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching profile",
        });
      });
  };

  const handleUpdate = () => {
    const updatedDetails = {
      ...profileDetails,
      contactNumber: phone ? `+${phone}` : "",
    };

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
          message: err.response?.data?.message || "Update failed",
        });
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
      </Grid>

      <Grid item xs sx={{ width: "100%" }}>
        <Paper
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "90%", sm: "70%", md: "50%" },
            margin: "0 auto",
          }}
        >
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                label="Name"
                value={profileDetails.name}
                onChange={(event) => handleInput("name", event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                label="Bio (up to 250 words)"
                multiline
                rows={6}
                value={profileDetails.bio}
                onChange={(event) => {
                  const wordCount = event.target.value
                    .split(" ")
                    .filter((n) => n !== "").length;
                  if (wordCount <= 250) {
                    handleInput("bio", event.target.value);
                  }
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(val) => setPhone(val)}
                inputStyle={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 40px", marginTop: "30px" }}
            onClick={handleUpdate}
          >
            Update Details
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
