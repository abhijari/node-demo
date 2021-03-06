const mongoose = require("mongoose");
const postLikeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    isLike: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postLike = mongoose.model("postLike", postLikeSchema);
module.exports = postLike;
