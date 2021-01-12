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
        <div className="NavBar-title u-inlineBlock">open when...</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            home
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
