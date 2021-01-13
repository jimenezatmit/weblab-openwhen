import React, { Component } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="u-inlineBlock NavBar-tabContainer">
          <Link to="/" className="NavBar-title NavBar-link u-bold">
            open when...
          </Link>
          <Link to="/create/" className="NavBar-link">
            create
          </Link>
          <Link to="/read/" className="NavBar-link">
            read
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
