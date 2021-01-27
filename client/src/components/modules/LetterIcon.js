import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import purpleClosed from "../../public/purpleclosed.png";
import tealClosed from "../../public/tealclosed.png";
import purpleOpen from "../../public/purpleopen.png";

import "../../utilities.css";
import "./LetterIcon.css";

class LetterIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.current_letter_index === this.props.index ? (
          <div className="u-textCenter">
            <img
              src={purpleOpen}
              alt="Purple Open"
              style={{
                marginTop: 10,
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
        ) : (
          <div className="u-textCenter">
            <img
              src={purpleClosed}
              alt="Purple Closed"
              style={{
                marginTop: 20,
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
        )}
      </>
    );
  }
}
export default LetterIcon;
