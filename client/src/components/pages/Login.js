import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Login.css";

const GOOGLE_CLIENT_ID = "158742950516-7n744r6o2q6mrvfiel2i1lrgno87rucv.apps.googleusercontent.com";

/**
 *
 * @param handleLogin (function)
 * @param handleLogout (function)
 * @param {number} userID
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    document.title = "Open When: Login";
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  //   handleClick = (event) => {
  //     event.preventDefault();
  //     console.log(this.props.nextpage);
  //     if (this.props.nextpage === "read") {
  //       navigate(`/mailbox/`);
  //     } else {
  //       navigate("/create/");
  //     }
  //   };

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id }).then(() => {
        if (this.props.nextpage === "read") {
          navigate(`/mailbox/`);
        } else {
          navigate(`/create/`);
        }
      });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <div className="u-textCenter">
          <h1 className="Login-title u-textCenter">Login</h1>
          {this.state.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
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
              onClick={this.handleClick}
              className=" NavBar-link NavBar-login"
            />
          )}
        </div>
      </>
    );
  }
}

export default Login;
