import React, { Component } from "react";
import { Link } from "@reach/router";
import NewLetter from "../modules/Letter.js";

import "../../utilities.css";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [],
    };
  }

  componentDidMount() {
    document.title = "Create Page";
  }

  // this gets called when the user pushes "add another!", so their
  // letters get stored in the letter package right away
  // not relevant unless displaying letters
  // addNewLetter = (letterObj) => {
  //   this.setState({
  //     letters: this.state.letters.concat(letterObj),
  //   });
  //   console.log(this.state.letters);
  // };

  render() {
    return (
      <>
        <h1 className="Create-title u-textCenter">Create</h1>
        <div id="subHeading">
          enter the fields below to write letters to send to your recipient!
        </div>
        <NewLetter addNewLetter={this.addNewLetter} />
        {/* add state, number of forms showing, add 1 to number of forms showing with every button, using .map */}
      </>
    );
  }
}

export default Create;
