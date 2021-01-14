const mongoose = require("mongoose");

//define a comment schema for the database
const LetterSchema = new mongoose.Schema({
  open_date: String,
  message: String,
  package_id: String,
  prompt: String,
  has_sent: Boolean,
});

// compile model from schema
module.exports = mongoose.model("letter", LetterSchema);
