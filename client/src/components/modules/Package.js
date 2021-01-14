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
      package_id : 0, //Number,
      sender_name: "", //String,
      recipient_email: "" //String
    };
  }

  componentDidMount() {
    get("/api/package").then((package) => {
      this.setState({
        package_id: package.package_id,
        sender_name: package.sender_name,
        recipient_email : package.recipient_email
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