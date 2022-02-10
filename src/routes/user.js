const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
//signup
router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.checkCredential(req.body.email, req.body.password);

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
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
