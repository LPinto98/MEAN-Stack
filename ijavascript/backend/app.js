const path = require("path");
const express = require("express");
const userRoutes = require("./routes/user");
const contentRoutes = require("./routes/content");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();

app.use(cors());
app.use(express.json()) // Express has already a method to parse json
app.use(express.urlencoded({ extended: false })) //Allso for the url encoded

mongoose.Promise = global.Promise;

//CONNECTION
let uri = "mongodb://localhost/ijavascript";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } ).then(
    () => { console.log("Database is now 'Connected'")},
    (error) => { console.log("Error : ", error) }
);

app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use("/api/user", userRoutes);

app.use("/api/content", contentRoutes);

module.exports = app;
