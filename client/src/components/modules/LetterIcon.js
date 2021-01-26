import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import purpleClosed from "../../public/purpleclosed.png";
import tealClosed from "../../public/tealclosed.png";

import "../../utilities.css";
import "./LetterIcon.css";

class LetterIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="u-textCenter">
          <img
            src={purpleClosed}
            alt="Purpose Closed"
            style={{
              marginTop: 40,
              width: 200,
              resizeMode: "contain",
              position: "relative",
            }}
            onClick={() => {
              console.log("hello");

              this.props.handleClick(this.props.index);
            }}
          />
        </div>
      </>
    );
  }
}
export default LetterIcon;
