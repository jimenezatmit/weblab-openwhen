const mongoose = require("mongoose");

//define a comment schema for the database
const PackageSchema = new mongoose.Schema({
  // package_id : String,
  sender_name: String,
  recipient_email: String,
  sender_id: String,
  recipient_id: String,
});

// compile model from schema
module.exports = mongoose.model("package", PackageSchema);
