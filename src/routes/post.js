const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");
const PostLike = require("../models/postLike");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/blog-imgs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Ivalid file formate"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });
//create post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    topics: req.body.topics.split(","),
  });

  //res.send(req.body.topics);
  try {
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get my post
router.get("/me", async (req, res) => {
  try {
  } catch (e) {}
});

//get post by topic
router.get("/topic/:id", async (req, res) => {
  try {
    const posts = await Post.find({ topics: req.params.id }).populate("topics");
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update post
router.patch("/", async (req, res) => {
  try {
  } catch (e) {}
});

//delete post
router.delete("/", async (req, res) => {
  try {
  } catch (e) {}
});

//get most recent
router.get("/most-recent", async (req, res) => {
  try {
  } catch (e) {}
});

//get most liked
router.get("/most-liked", (req, res) => {
  try {
  } catch (e) {}
});

//like/dislike post
router.post("/", async (req, res) => {
  try {
    const postLike = await PostLike.findOne({ author: req.user._id });
    if (postLike) {
      if (req.body.isLike === true) {
        if (postLike.isLike === true) {
          //delete like
          await postLike.delete();
          res.send(post);
        } else {
          //update to true
          postLike.isLike = true;
          await postLike.save();
          res.send();
        }
      } else {
        if (postLike.isLike === false) {
          //delete like
          await postLike.delete();
          res.send(postLike);
        } else {
          //update to false
          postLike.isLike = false;
          await postLike.save();
          res.send();
        }
      }
    } else {
      const postlike = new PostLike(req.body);
      await postLike.save();
      res.send(postlike);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
