import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import { post } from "../../utilities.js";

import "../../utilities.css";
import "./Read.css";
import  "./Create.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class Read extends Component {
  constructor(props) {
    super(props);
    this.state  = {
        package_id: "",
        sender_name:  "",
    }
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

    get("/api/package", body).then((package1) => 

    this.setState({
      sender_name: package1.sender_name,
      package_id: package1.package_id,
    }));
  };

  //need to figure out how to pass sender_name and package_id as props to next page with letters
  render() {
    return (
      <>
      <div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="code">
              enter package id code from email
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
          <button
            type="button"
            className="Create-button Create-subDescription"
            onClick={this.handleSubmit}
          >
            <Link to="/letter/" className="Create-link">
              get letters
            </Link>
          </button>
        </div>
      </>
      );
    };
 };

export default Read;

    //     /* <link
    //       rel="stylesheet"
    //       href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
    //       crossorigin="anonymous"
    //     ></link>
    //     <h1 className="u-textCenter"> Kate has sent you a letter!</h1>
    //     <h2 className="Read-instruction"> Click on envelope to open </h2>
    //     <div className="Read-envelopeCentered Read-envelopeBlue">
    //       <i onClick={() => navigate("/letter/")} className="far fa-envelope fa-10x "></i> //
    //       conditional with date
    //     </div>
    //     <h3 className="Read-prompt"> open when you've finished your website... </h3> */}
    // //   </>  