const mongoose = require("mongoose");

//define a comment schema for the database
const PackageSchema = new mongoose.Schema({
    _id : Number,
    letter_ids: Object, //list of letter ids?
    sender_name: String,
    recipient_email: String
});

// compile model from schema
module.exports = mongoose.model("package", PackageSchema);
