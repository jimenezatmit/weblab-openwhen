import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import purplePackage from "../../public/purplepackage.png";
import tealPackage from "../../public/tealpackage.png";

import "../../utilities.css";
import "./PackageIcon.css";

class PackageIcon extends Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount make the get request, store the letters somehow in a state
  handleClick = () => {
    // get("/api/package", { package_id: this.props.package_id }).then((packageObj) => {
    navigate(`/envelopes/`, { state: { package_id: this.props.package_id } });
    // });
  };

  render() {
    let packageIcon = null;
    if (this.props.type === "create") {
      packageIcon = (
        <img
          src={purplePackage}
          alt="Create"
          style={{
            marginTop: 40,
            width: 200,
            resizeMode: "contain",
            position: "relative",
          }}
          onClick={this.handleClick}
        />
      );
    } else {
      packageIcon = (
        <img
          src={tealPackage}
          alt="Read"
          style={{
            marginTop: 40,
            width: 200,
            resizeMode: "contain",
            position: "relative",
          }}
          onClick={this.handleClick}
        />
      );
    }
    return (
      <>
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link> */}
        <div className="u-textCenter">
          {packageIcon}
          <h3 className="Envelope-prompt PackageIcon-black"> {this.props.word_under} </h3>
        </div>
      </>
    );
  }
}
export default PackageIcon;
