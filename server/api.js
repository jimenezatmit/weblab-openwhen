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

// takes in recipient email, sender name, and package ID and sends automatic email to recipient
function sendMail(recipient_email, sender_name, package_id) {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // need to put in your own email and password for it to work, just took it out for now so i don't push my personal info onto github
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var website_link = "https://openwhen.herokuapp.com/";

  console.log("sender name", sender_name);
  var message = {
    from: process.env.MAIL_USER,
    to: recipient_email,
    subject: "Open When: You Received a Package from ".concat(sender_name),
    // text: "Go to https://openwhen.herokuapp.com/read/ and paste in the following package ID to receive your package: ".concat(
    //   package_id),
    html:
      "<h3 style='color:#59c3c3'> You have a package from Open When! To view, </h3>" +
      "<h3 style='color:#50514f'> 1. Copy this code: " +
      "<h3 style ='color:#b4adea'>" +
      package_id +
      "</h3> <h3 style='color:#50514f'> 2. Go to <a href='" +
      website_link +
      "' > this link </a> and click the 'get started button' to log in. Then, navigate to the 'mailbox' page and click the  'add a package id' button, pasting in the code from above. </h3>",
    // <br></br> <img src='/src/public/logo.png' alt='Open When' style='marginTop: 40, width: 200, resizeMode: 'contain', position: 'relative''/> "
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", message.text);
  });
}

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/email", (req, res) => {
  sendMail(req.body.recipient_email, req.body.sender_name, req.body.package_id);
  console.log("email sent!");
});

router.post("/letter", (req, res) => {
  const newLetter = new Letter({
    open_date: req.body.open_date,
    message: req.body.message,
    package_id: req.body.package_id,
    prompt: req.body.prompt,
    sender_name: req.body.sender_name,
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
    sender_id: req.body.sender_id,
  });

  newPackage
    .save()
    .then((package) => res.send(package))
    .then(() => console.log(newPackage));
});

router.post("/deleteletter", (req, res) => {
  Letter.deleteOne({ _id: req.body.letter_id }).then(() => console.log("deleted letter"));
});

//trying to add get for package and letter 1/15
router.get("/updatepackage", (req, res) => {
  Package.findOne({ _id: req.query.package_id }).then((package) => {
    package.recipient_id = req.query.recipient_id;
    package.save();
    res.send(package);
  });
});

router.get("/updateletter", (req, res) => {
  Letter.findOne({ _id: req.query.letter_id }).then((letter) => {
    letter.message = req.query.message;
    letter.prompt = req.query.prompt;
    letter.open_date = req.query.open_date;
    letter.save();
    res.send(letter);
  });
});

router.get("/letter", (req, res) => {
  console.log(req.query.letter_id);
  Letter.findOne({ _id: req.query.letter_id }).then((letter) => {
    res.send(letter);
  });
});

router.get("/allletters", (req, res) => {
  Letter.find({ package_id: req.query.package_id }).then((letters) => {
    res.send(letters);
  });
});

// Kate wrote the two below to use for Mailbox late

router.get("/allreceivedpackages", (req, res) => {
  Package.find({ recipient_id: req.query.recipient_id }).then((packages) => {
    res.send(packages);
  });
});

router.get("/allcreatedpackages", (req, res) => {
  Package.find({ sender_id: req.query.sender_id }).then((packages) => {
    res.send(packages);
  });
});

router.get("/");

//pasted in from catbook
router.get("/user", (req, res) => {
  User.findById(req.query.user_id).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
