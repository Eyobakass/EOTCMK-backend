const Post=require('../models/post');
const express=require('express');
const router=express.Router();
const {authorization}=require('../middlewares/authorization')


router.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      if (posts.length == 0) {
        return res.status(404).send({ message: "No posts found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.post('/',authorization, async (req, res) => {
    try {
      const newPost = new Post({
        title: req.body.title,
        smallContent: req.body.smallContent,
        fullContent: req.body.fullContent,
        image: req.body.image,
        author: req.body.author,
      });
      await newPost.save();
      res.status(201).send(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.put('/:id',authorization, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).send({ message: "Post not found" });
      post.title = req.body.title;
      post.smallContent = req.body.smallContent;
      post.fullContent = req.body.fullContent;
      post.image = req.body.image;
      post.author = req.body.author;
      await post.save();
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }


    router.delete('/:id',authorization, async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          if (!post) return res.status(404).send({ message: "Post not found" });
          await post.remove();
          res.send({ message: "Post deleted successfully" });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      });
    });



module.exports.postRouter=router;