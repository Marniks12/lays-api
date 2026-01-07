const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Bag", bagSchema);
