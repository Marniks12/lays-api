const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bagColor: String,
  pattern: String,
  chipsType: String,
  previewImage: String,

  votes: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Design", DesignSchema);
