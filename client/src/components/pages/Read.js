import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import { post } from "../../utilities.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Read.css";
import "./Create.css";

//not sure if this line below/filepath is right but doesn't show error
const PackageSchema = require("/server/models/package.js");


class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      package_id: "",
    };
  }

  componentDidMount() {
    document.title = "Open When: Read";
  }

  // called whenever the user types in the recipient input field
  // updates the field that has changed
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  //takes in input from form and uses that to query database to find package
  handleSubmit = (event) => {
    event.preventDefault();

    // fields that we would feed into api
    const body = {
      package_id: this.state.package_id,
    };

    console.log(body);

    //Jan 21 add recipient_id to corresponding package in db -> not sure if this is right
    PackageSchema.findOneAndUpdate(body, {recipient_id: this.props.userID});
    // get("/api/package", body).then((packageObj) =>
    //   navigate(``)
    // );
    // this.setState({
    //   package_id: "",
    // });
  };

  //need to figure out how to pass sender_name and package_id as props to next page with letters
  render() {
    return (
      <>
        <div>
          <h1 className="Create-title u-textCenter">open package</h1>
          <div id="subHeading">unwrap your package of letters!</div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="code">
              package code from email
            </label>
            <br></br>
            <input
              className="Create-field"
              name="package_id"
              placeholder="ABCD123"
              type="text"
              id="code"
              onChange={this.handleChange}
              value={this.state.package_id}
            ></input>
            <br></br>
          </form>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.handleSubmit}>
            see letters
          </button>
        </div>
      </>
    );
  }
}

export default Read;
