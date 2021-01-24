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
 * @param userID
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        this.props.userID ? 
         ( <div>
          <nav className="NavBar-container">
          <Link to="/" className="NavBar-title NavBar-link u-bold">
            open when...
          </Link>
          <Link to="/howitworks/" className="NavBar-link">
            how it works
          </Link>
            <Link to="/create/" className="NavBar-link NavBar-linkContainer ">
              create
            </Link>
            <Link to="/mailbox/" className="NavBar-link NavBar-linkContainer ">
              mailbox
            </Link>
            <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login "
          />
            </nav>
          </div>)
         : 
        (<div>
        <nav className="NavBar-container">
        <Link to="/" className="NavBar-title NavBar-link u-bold">
          open when...
        </Link>
        <Link to="/howitworks/" className="NavBar-link">
          how it works
        </Link>
        <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            className=" NavBar-link NavBar-login"
          />
        </nav>
        </div>)

    
    );
  }
}

export default NavBar;
