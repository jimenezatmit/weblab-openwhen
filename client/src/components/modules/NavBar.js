import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "158742950516-7n744r6o2q6mrvfiel2i1lrgno87rucv.apps.googleusercontent.com";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages.
 *
 * @param handleLogin (function)
 * @param handleLogout (function)
 * @param {number} userID
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <Link to="/" className="NavBar-title NavBar-link u-bold">
          open when...
        </Link>
        <Link to="/howitworks/" className="NavBar-link">
          how it works
        </Link>
        {this.props.userID ? (
          <div>
            <Link to="/create/" className="NavBar-link">
              create
            </Link>
            <Link to="/mailbox/" className="NavBar-link">
              mailbox
            </Link>
          </div>
        ) : null}

        {this.props.userID ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login "
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            className=" NavBar-link NavBar-login"
          />
        )}
      </nav>
    );
  }
}

export default NavBar;
