const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const postSchema = new mongoose.Schema({
  title: String,
  smallContent: String,
  content: String,
  image: { data: Buffer, contentType: Image },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

postSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id},
    process.env.JWT_PRIVATE_KEY
  );
  return token;
}
const Post = mongoose.model("post", postSchema);
