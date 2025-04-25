const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const cookieSession = require("cookie-session");
// const passport = require("./lib/passportConfig");
require("dotenv").config();
const passport = require("./lib/passport");

// MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/Placement-Cell", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((res) => console.log("Connected to DB"))
//   .catch((err) => console.log(err));
mongoose
  .connect("mongodb+srv://sakshi_10:Sakshi10@cluster0.p8sxjzs.mongodb.net/PlacementCell", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// initialising directories
// if (!fs.existsSync("./public")) {
//   fs.mkdirSync("./public");
// }
// if (!fs.existsSync("./public/resume")) {
//   fs.mkdirSync("./public/resume");
// }
// if (!fs.existsSync("./public/profile")) {
//   fs.mkdirSync("./public/profile");
// }

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(passport.initialize());
app.use(passport.session());
// Setting up middlewares

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));

app.use("/api", require("./routes/apiRoutes"));
// app.use("/upload", require("./routes/uploadRoutes"));
// app.use("/host", require("./routes/downloadRoutes"));

app.get("/backend", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});