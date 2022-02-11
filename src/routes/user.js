const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
//signup
router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.checkCredential(req.body.email, req.body.password);

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

//get user detail
router.get("/profile/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update user
router.patch("/", auth, async (req, res) => {
  try {
  } catch (e) {}
});

//logout user
router.post("/logout", auth, async (req, res) => {
  try {
    const user = await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $pull: {
          tokens: {
            token: req.token,
          },
        },
      }
    );
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//logout from all
router.post("/logoutAll", auth, async (req, res) => {
  try {
    const user = await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          tokens: [],
        },
      }
    );
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
