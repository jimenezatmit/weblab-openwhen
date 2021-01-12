import React, { Component } from "react";
import "./Package.css";

/**
 * Package is a component for keeping track of one order of letter(s) from someone to someone 
 *
 * Proptypes (?)
 * 
 */
class Package extends Component {
  constructor(props) {
    super(props);
    this.state = { //currently set to dummy default values
      _id : 0, //Number,
      letter_ids: [0,1,2], //Object, //list of letter ids?
      sender_name: "Sample Huevita", //String,
      recipient_email: "sample_email@huevita.com" //String
    };
  }

  componentDidMount() {
    get("/api/package").then((package) => {
      this.setState({
        _id: package._id,
        letter_ids: package.letter_ids,
        sender_name: package.sender_name,
        recipient_email = package.recipient_email
      });
    });
  }

  // figure out how to trigger
  addLetterToPackage = (letterObj) => {
    this.setState({
      letter_ids : letter_ids.concat(letterObj._id),
    });
  };

};
export default Package;