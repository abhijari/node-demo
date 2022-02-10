const mongoose = require("mongoose");
const postComment = require("./PostComment");
const postLike = require("./postLike");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "topic",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.pre("remove", async function (next) {
  const post = this;
  await postLike.deleteMany({ post: post._id });
  await postComment.deleteMany({ post: post._id });
  next();
});
const User = mongoose.model("post", postSchema);
module.exports = User;
