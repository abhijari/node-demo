const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");
const auth = require("../middleware/auth");

//get all topic
router.get("/", auth,async (req, res) => {
  try {
    const topics = await Topic.find();
    res.send(topics);
  } catch (e) {
    res.status(500).send(e);
  }
});

//craete topic
router.post("/",auth, async (req, res) => {
  const topic = new Topic(req.body);

  try {
    await topic.save();
    res.status(201).send(topic);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
