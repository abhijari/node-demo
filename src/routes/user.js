const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

//signup
router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
  } catch (e) {}
});

//get user detail
router.get("/profile/me", async (req, res) => {
  try {
  } catch (e) {}
});

//update user
router.patch("/", async (req, res) => {
  try {
  } catch (e) {}
});

//logout user
router.post("/logout", async (req, res) => {
  try {
  } catch (e) {}
});

//logout from all
router.post("/logoutAll", async (req, res) => {
  try {
  } catch (e) {}
});
module.exports = router;
