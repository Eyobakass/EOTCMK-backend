require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { adminAuthRouter } = require("./routes/adminAuth");
const config = require("config");
const { adminRouter } = require("./routes/adminRoute");
mongoose.connect("mongodb://localhost/MK")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(error => console.error("Error connecting to MongoDB:", error));
app.use(express.json());
app.use('/api/adminAuth', adminAuthRouter);
app.use('/api/admins',adminRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
