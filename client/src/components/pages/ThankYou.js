import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./ThankYou.css";

class ThankYou extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When";
  }

  render() {
    return (
      <>
        <h1 className="Thank-title u-textCenter">Thank You</h1>
        <h2 className="subheading u-textCenter">your package has been sent</h2>
        <div className="buttonContainer">
          <button type="button" className="Thank-button Thank-description">
            <Link to="/" className="Thank-link">
              return home
            </Link>
          </button>

          <button type="button" className="Thank-button Thank-description">
            <Link to="/create" className="Thank-link">
              send a new package
            </Link>
          </button>

          <button type="button" className="Thank-button Thank-description">
            <Link to="/mailbox" className="Thank-link">
              see your mailbox
            </Link>
          </button>
        </div>
      </>
    );
  }
}

export default ThankYou;
