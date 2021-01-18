import React, { Component } from "react";
import Letter from "./Letter.js";
import { Link } from "@reach/router";
import { post } from "../../utilities.js";

import { navigate } from "@reach/router";

import "./Package.css";

/**
 * Package is a component for keeping track of one order of letter(s) from someone to someone
 *
 * Proptypes
 *
 */
class Package extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender_name: "",
      recipient_email: "",
    };
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateName = (name) => {
    const re = /^[a-z ,.'-]+$/i;
    return re.test(String(name));
  };

  // called whenever the user types in the recipient input field
  // updates the field that has changed
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let ready = false;
    if (
      this.validateName(this.state.sender_name) &&
      this.validateEmail(this.state.recipient_email)
    ) {
      ready = true;
    }

    if (!ready) {
      console.log("Please complete the required fields before submitting.");
    } else {
      const body = {
        sender_name: this.state.sender_name,
        recipient_email: this.state.recipient_email,
      };

      console.log(body);

      post("/api/package", body).then((packageObj) => {
        navigate(`/writeletters/`, {
          state: { sender_name: packageObj.sender_name, package_id: packageObj._id , recipient_email: packageObj.recipient_email},
        });
        // this.props.location.state
      });

      this.setState({
        sender_name: "",
        recipient_email: "",
      });
    }
  };

  render() {
    return (
      <>
        <div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="name">
              your name*
            </label>
            <br></br>
            <input
              className="Create-field"
              name="sender_name"
              placeholder="First Last"
              type="text"
              id="name"
              onChange={this.handleChange}
              value={this.state.sender_name}
              required
            ></input>
            <br></br>

            <label className="Create-description" htmlFor="email">
              recipient email*
            </label>
            <br></br>
            <input
              className="Create-field"
              name="recipient_email"
              placeholder="test@example.com"
              type="text"
              id="email"
              onChange={this.handleChange}
              value={this.state.recipient_email}
              required
            ></input>
            <br></br>
          </form>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.handleSubmit}>
            next
          </button>
        </div>
      </>
    );
  }
}
export default Package;
