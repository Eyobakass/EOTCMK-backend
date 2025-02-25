const express = require("express");
const multer = require("multer");
const { authorization } = require("../middlewares/authorization");
const Post = require("../models/post");

const router = express.Router();

// Configure Multer (stores images in memory as a Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 GET all posts (Now returns posts properly)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      return res.status(404).send({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 🔹 CREATE a new post (Handles image upload)
router.post("/", authorization, upload.single("image"), async (req, res) => {
  try {
    const { title, smallContent, fullContent, author } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const newPost = new Post({
      title,
      smallContent,
      fullContent,
      image: {
        data: req.file.buffer, // Store the binary image data
        contentType: req.file.mimetype, // Store the image type
      },
      author,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 🔹 UPDATE a post (Handles image update)
router.put("/:id", authorization, upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { title, smallContent, fullContent, author } = req.body;

    post.title = title || post.title;
    post.smallContent = smallContent || post.smallContent;
    post.fullContent = fullContent || post.fullContent;
    post.author = author || post.author;

    // Update image only if a new one is uploaded
    if (req.file) {
      post.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 🔹 DELETE a post
router.delete("/:id", authorization, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 🔹 GET a post's image
router.get("/:id/image", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.image) return res.status(404).send("Image not found");

    res.contentType(post.image.contentType);
    res.send(post.image.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports.postRouter = router;
