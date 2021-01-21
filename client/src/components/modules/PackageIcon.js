import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";

import "../../utilities.css";
// import "./Envelope.css";

class PackageIcon extends Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount make the get request, store the letters somehow in a state
  handleClick = () => {
    // get("/api/package", { package_id: this.props.package_id }).then((packageObj) => {
    navigate(`/envelopes/${this.props.package_id}`);
    // });
  };

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link>
        <div className="u-textCenter">
          <i onClick={this.handleClick} className="fas fa-gift fa-6x"></i>
        </div>
        <h3 className="Envelope-prompt"> {this.props.word_under} </h3>
      </>
    );
  }
}
export default PackageIcon;
