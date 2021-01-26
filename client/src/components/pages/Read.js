import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import { post } from "../../utilities.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Read.css";
import "./Create.css";

class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      package_id: "",
      showError: false,
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

  validateID = (ID) => {
    return ID.length === 24 && typeof ID === String;
  };

  //takes in input from form and uses that to query database to find package
  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.validateID(this.state.package_id)) {
      this.setState({
        showError: true,
      });
    } else {
      // fields that we would feed into api
      const body = {
        package_id: this.state.package_id,
        recipient_id: this.props.userID,
      };

      console.log(body);

      get("/api/updatepackage", body)
        .then((packageObj) => {
          console.log(packageObj);
          navigate(`/mailbox`);
        })
        .catch((err) => {
          this.setState({
            showError: true,
          });
        });

      this.setState({
        package_id: "",
      });
    }
  };

  //need to figure out how to pass sender_name and package_id as props to next page with letters
  render() {
    return (
      <>
        {this.props.userID ? (
          <div>
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
              {this.state.showError ? <h4>Package ID incorrect. Try again.</h4> : null}
            </div>

            <div className="u-textCenter">
              <button type="button" className="Create-button" onClick={this.handleSubmit}>
                see letters
              </button>
            </div>
          </div>
        ) : (
          <h1 className="Create-title u-textCenter">to read, please login in top right first </h1>
        )}
      </>
    );
  }
}

export default Read;
