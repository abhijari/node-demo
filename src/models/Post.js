const mongoose = require("mongoose");
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

const User = mongoose.model("post", postSchema);
module.exports = User;
