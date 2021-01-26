import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";

import "../../utilities.css";
import "./LetterIcon.css";

class LetterIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link>
        <div className="u-textCenter">
          <i
            onClick={() => {
              console.log("hello");

              this.props.handleClick(this.props.index);
            }}
            className="far fa-envelope fa-10x"
          ></i>
        </div>
      </>
    );
  }
}
export default LetterIcon;
