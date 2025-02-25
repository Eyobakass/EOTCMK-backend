const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {authorization} = require("../middlewares/authorization");
router.get("/",authorization, async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) return res.status(404).send({ message: "No admins found" });
    res.send(admins);
  } catch {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", authorization, async (req, res) => {
  try {
    
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).send(newAdmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports.adminRouter = router;
