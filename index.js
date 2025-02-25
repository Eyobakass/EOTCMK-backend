require("express-async-errors");
const express = require("express");
const app = express();
const cors=require('cors')
const mongoose = require("mongoose");
const { adminAuthRouter } = require("./routes/adminAuth");
const { adminRouter } = require("./routes/adminRoute");
const { postRouter } = require("./routes/postRoute");
mongoose.connect("mongodb://localhost/MK")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(error => console.error("Error connecting to MongoDB:", error));
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["x-auth-token"],
  })
);
app.use('/api/adminAuth', adminAuthRouter);
app.use('/api/admins',adminRouter);
app.use('/api/posts',postRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
