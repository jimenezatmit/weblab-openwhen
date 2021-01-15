import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "158742950516-7n744r6o2q6mrvfiel2i1lrgno87rucv.apps.googleusercontent.com";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    this.setState({ loggedIn: true });
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      console.log(user);
    });
  };

  handleLogout = () => {
    console.log("Logged out successfully!");
    this.setState({ loggedIn: false });
    post("/api/logout");
  };

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
          {this.props.userId ? (
            <GoogleLogout //minor thing but in my dream world we would round the corners of this button too
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout" //doesn't actually show this currently :( always says login
              onLogoutSuccess={this.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login "
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={(err) => console.log(err)}
              className=" NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
