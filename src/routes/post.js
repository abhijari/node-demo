const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");
const postComment = require("../models/PostComment");
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
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "postlikes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: "$likes",
          },
        },
      },
      {
        $sort: {
          totalLikes: -1,
        },
      },
    ]);
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
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get most recent
router.get("/most-recent", async (req, res) => {
  try {
    const recentpost = await Post.find().sort({ _id: -1 });
    res.send(recentpost);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get most liked
router.get("/most-liked", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "postlikes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: "$likes",
          },
        },
      },
      {
        $sort: {
          totalLikes: -1,
        },
      },
    ]);
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

//like/dislike post
router.post("/like", async (req, res) => {
  try {
    const postLike = await PostLike.findOne({
      author: req.body.author,
      post: req.body.post,
    });

    if (postLike) {
      if (req.body.isLike == "true") {
        console.log("req.body.isLike == true");
        if (postLike.isLike == true) {
          //delete like
          await postLike.remove();
          res.send();
        } else {
          //update to true
          postLike.isLike = true;
          await postLike.save();
          res.send();
        }
      } else {
        console.log("req.body.isLike else");

        if (postLike.isLike == false) {
          //delete like
          await postLike.remove();
          res.send(postLike);
        } else {
          //update to false
          postLike.isLike = false;
          await postLike.save();
          res.send();
        }
      }
    } else {
      const like = new PostLike(req.body);
      await like.status(201).save();
      res.send(like);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/comment", async (req, res) => {
  try {
    const postcomment = new postComment(req.body);
    await postcomment.save();
    res.status(201).send(postcomment);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
