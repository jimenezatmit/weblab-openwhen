import React, { Component } from "react";
import "./Letter.css";

/**
 * Letter is a component for holding message and creator/recipient
 *
 * Proptypes (?)
 * @param {string} _id
 * @param {string} creator_name
 * @param {string} creator_id
 */
class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_date: "00/00/0000", //String,
      message: "Sample letter content", //String
      _id: "0",
      recipient_email: "sampleemail@huevita.com",
      sender_name: "Sample Sender",
      prompt: "Open when",
    };
  }

  componentDidMount() {
    get("/api/letter", { parent: this.props._id }).then((letter) => {
      this.setState({
        message: letter.message,
        open_date: letter.open_date,
        _id: letter._id,
        recipient_email: letter.recipient_email,
        sender_name: letter.sender_name,
        prompt: letter.prompt,
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // letter gets added right away
  addNewLetter = (letterObj) => {
    this.setState({
      open_date: letterObj.open_date,
      message: letterObj.message,
      _id: letterObj._id,
      recipient_email: letterObj.recipient_email,
      sender_name: letterObj.sender_name,
      prompt: letterObj.prompt,
    });
  };
}
export default Letter;
