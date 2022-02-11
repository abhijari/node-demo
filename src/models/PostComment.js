const mongoose = require("mongoose");
const postCommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postComment",
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postComment = mongoose.model("postComment", postCommentSchema);
module.exports = postComment;
