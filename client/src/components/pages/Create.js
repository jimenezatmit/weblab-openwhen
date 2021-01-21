import React, { Component } from "react";
import { Link } from "@reach/router";
import Letter from "../modules/Letter.js";
import Package from "../modules/Package.js";

import "../../utilities.css";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When: Create";
  }

  render() {
    return (
      <>
        <h1 className="Create-title u-textCenter">Create</h1>
        <div id="subHeading">enter the fields below to get started!</div>

        <Package userID={this.props.userID}></Package>
      </>
    );
  }
}

export default Create;
