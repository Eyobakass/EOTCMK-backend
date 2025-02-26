const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Router = express.Router();
const Admin = require("../models/admin");
Router.post("/", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send({ message:"Invalid email or password"});
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) return res.status(400).send({message:"Invalid email or password"});
    const token = admin.generateAuthToken();
    res.header("x-auth-token", token).status(200).send(_.pick(admin, ["_id", "name"]));
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
module.exports.adminAuthRouter = Router;
