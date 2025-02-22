require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/MK")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(error => console.error("Error connecting to MongoDB:", error));
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
