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


  var package_link = "https://openwhen.herokuapp.com/envelopes/".concat(package_id)
 


  var message = {
    from: process.env.MAIL_USER,
    to: recipient_email,
    subject: "Open When: You Received a Package from ".concat(sender_name),
    // text: "Go to https://openwhen.herokuapp.com/read/ and paste in the following package ID to receive your package: ".concat(
    //   package_id),
    html: "<h2 style='color:#59c3c3'> Click <a href='" + package_link + "' > here</a> to open your package of letters! </h2>"
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
    sender_name:  req.body.sender_name
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
  });

  newPackage
    .save()
    .then((package) => res.send(package))
    .then(() => console.log(newPackage));
});

//trying to add get for package and letter 1/15
router.get("/package", (req, res) => {
  Package.findOne({ _id: req.query.package_id }).then((package) => {
    res.send(package);
  });
});

router.get("/letter", (req, res) => {
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

// async function main() {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//       user: "anjimeneziscool@gmail.com",
//       pass: "", // need to put in your own email and password for it to work, just took it out for now so i don't push my personal info onto github
//     },
//   });

//   // verify connection configuration
//   transporter.verify(function (error, success) {
//     if (error) {
//       console.log("ERROR!", error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });

//   var message = {
//     from: "anjimeneziscool@gmail.com",
//     to: "jimeneza@mit.edu",
//     subject: "HIHIHI",
//     text: "Plaintext version of the message",
//     html: "<p>HTML version of the message</p>",
//   };

//   transporter.sendMail(message, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message sent: %s", message.messageId);
//   });
// }

// main().catch(console.error);
