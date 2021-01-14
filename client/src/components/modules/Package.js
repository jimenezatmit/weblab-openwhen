import React, { Component } from "react";
import Letter from "./Letter.js";
import { Link } from "@reach/router";
import { post } from "../../utilities.js";

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

    // fields that we would save into api
    const body = {
      sender_name: this.state.sender_name,
      recipient_email: this.state.recipient_email,
    };

    console.log(body);

    post("/api/package", body);

    this.setState({
      sender_name: "",
      recipient_email: "",
    });
  };

  render() {
    return (
      <>
        <div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="name">
              your name
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
            ></input>
            <br></br>

            <label className="Create-description" htmlFor="email">
              recipient email
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
            ></input>
            <br></br>
          </form>
        </div>

        <div className="u-textCenter">
          <button
            type="button"
            className="Create-button Create-subDescription"
            onClick={this.handleSubmit}
          >
            <Link to="/writeletters" className="Create-link">
              next
            </Link>
          </button>
        </div>
      </>
    );
  }
}
export default Package;

// componentDidMount() {
//   get("/api/package").then((package) => {
//     this.setState({
//       package_id: package.package_id,
//       sender_name: package.sender_name,
//       recipient_email: package.recipient_email,
//     });
//   });
// }

// // figure out how to trigger
// addLetterToPackage = (letterObj) => {
//   this.setState({
//     letter_ids: letter_ids.concat(letterObj._id),
//   });
// };
