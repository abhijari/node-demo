const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("topic", topicSchema);
module.exports = Topic;
