import React, { Component } from "react";
import { Link } from "@reach/router";
import logo from "../../public/logo.png";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When: Home";
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
          ;
        </div>
      </>
    );
  }
}

export default Home;
