const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bagColor: String,
    image: String,
    font: String,
    pattern: String,
    chipsType: String,
    keyFlavours: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bag", bagSchema);
