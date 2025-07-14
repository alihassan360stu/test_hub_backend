const mongoose = require("mongoose");

const RawJsonSchema = new mongoose.Schema({
  data: {
    type: String, // Stores stringified JSON
    required: true,
  },
});

module.exports = mongoose.model("Data-generator", RawJsonSchema);
