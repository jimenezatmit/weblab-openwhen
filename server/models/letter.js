const mongoose = require("mongoose");

//define a comment schema for the database
const LetterSchema = new mongoose.Schema({
    open_date : String,
    message: String,
    _id: Number  //maybe?
});

// compile model from schema
module.exports = mongoose.model("letter", LetterSchema);
