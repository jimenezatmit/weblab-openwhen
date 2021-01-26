import React, { Component } from "react";
import { Link } from "@reach/router";
import logo from "../../public/logo.png";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "158742950516-7n744r6o2q6mrvfiel2i1lrgno87rucv.apps.googleusercontent.com";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When";
  }

  render() {
    return (
      <>
        <div className="u-textCenter">
          <div>
            <img
              src={logo}
              alt="Open When"
              style={{
                marginTop: 40,
                width: 200,
                resizeMode: "contain",
                position: "relative",
              }}
            />
            <h1 className="Home-title u-textCenter">open when...</h1>
          </div>
          <div className="Home-description">
            send a package of virtual letters with custom unlocking dates
          </div>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Home-newButton Home-description">
            <Link to="/howitworks/" className="Home-link">
              how it works
            </Link>
          </button>
          {this.props.userID ? null : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="get started"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="Home-newButton Home-description"
              theme="dark"
              render={(renderProps) => (
                <button
                  className="Home-newButton Home-description"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  get started
                </button>
              )}
            />
          )}

          {this.props.userID ? (
            <div>
              <button type="button" className="Home-newButton Home-description">
                <Link to="/create/" className="Home-link">
                  create
                </Link>
              </button>
              <button type="button" className="Home-newButton Home-description">
                <Link to="/mailbox/" className="Home-link">
                  mailbox
                </Link>
              </button>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Home;
