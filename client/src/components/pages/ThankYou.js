import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./ThankYou.css";

class ThankYou extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1 className="Thank-title u-textCenter">
          Thank you for using Open When! Your letter have been sent.
        </h1>
        <div className="buttonContainer">
          <button type="button" className="Thank-button Thank-description">
            <Link to="/" className="Thank-link">
              return home
            </Link>
          </button>

          <button type="button" className="Thank-button Thank-description">
            <Link to="/writeletters" className="Thank-link">
              send another letter
            </Link>
          </button>

          <button type="button" className="Thank-button Thank-description">
            <Link to="/create" className="Thank-link">
              send a new package
            </Link>
          </button>
        </div>
      </>
    );
  }
}

export default ThankYou;
