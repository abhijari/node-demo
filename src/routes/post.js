const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

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
router.post("/", upload.array("images", 5), (req, res) => {});

//get all post
router.get("/", (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get my post
router.get("/me", (req, res) => {
  try {
  } catch (e) {}
});

//update post
router.patch("/", (req, res) => {
  try {
  } catch (e) {}
});

//delete post
router.delete("/", (req, res) => {
  try {
  } catch (e) {}
});

//get most recent
router.get("/most-recent", (req, res) => {
  try {
  } catch (e) {}
});

//get most liked
router.get("/most-liked", (req, res) => {
  try {
  } catch (e) {}
});

//like/dislike post
router.post("/", (req, res) => {
  try {
  } catch (e) {}
});
