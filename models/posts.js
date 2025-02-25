const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  smallContent: String,
  fullContent: String,
  image: { data: Buffer, contentType: Image },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


const Post = mongoose.model("post", postSchema);
module.exports = Post;
