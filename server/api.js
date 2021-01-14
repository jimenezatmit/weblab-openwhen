/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
//added by Kate
const Letter = require("./models/letter");
const Package = require("./models/package");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/letter", (req, res) => {
  const newLetter = new Letter({
    open_date: req.body.open_date,
    message: req.body.message,
    package_id: req.body.package_id,
    // recipient_email: req.body.recipient_email,
    // sender_name: req.body.sender_name,
    prompt: req.body.prompt,
    has_sent: req.body.has_sent,
  });

  newLetter
    .save()
    .then((letter) => res.send(letter))
    .then(() => console.log(newLetter));
});

//attempting post package
router.post("/package", (req, res) => {
  const newPackage = new Package({
    sender_name: req.body.sender_name,
    recipient_email: req.body.recipient_email,
    //recipient_email = req.body.recipient_email //this line causes an error
    // _id: req.user._id,
    // letter_ids: req.body.letter_ids,
  });

  newPackage
    .save()
    .then((package) => res.send(package))
    .then(() => console.log(newPackage));
});

//pasted in from catbook
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
