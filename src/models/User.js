const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const PostLike = require("../models/Post");
const PostComment = require("../models/PostComment");
const postLike = require("./postLike");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid Email Formate!!");
        }
      },
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_TOKEN
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};
userSchema.statics.checkCredential = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw "Unable to login";
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw "Unable to login";
  }

  return user;
};

userSchema.virtual("postList", {
  ref: "post",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Post.deleteMany({ author: user._id });
  await PostLike.deleteMany({ author: user._id });
  await PostComment.deleteMany({ author: user._id });
  next();
});
const User = mongoose.model("user", userSchema);
module.exports = User;
