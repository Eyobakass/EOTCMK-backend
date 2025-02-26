const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  smallContent: String,
  fullContent: String,
  image: {
    data: Buffer, // Store binary image data
    contentType: String, // Store the MIME type (e.g., "image/png")
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
