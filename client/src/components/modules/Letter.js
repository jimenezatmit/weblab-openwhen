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
      open_date : String,
      message: String,
      //_id: number?? idk does this need an id?
    };
  }

  componentDidMount() {
    get("/api/letter", { parent: this.props._id }).then((letter) => {
      this.setState({
        message: letter.message,
        open_date: letter.open_date
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // letter gets added right away
  addNewLetter = (letterObj) => {
    this.setState({
      open_date: letterObj.open_date,
      message: letterObj.message
    });
  };

};
export default Letter;
