import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import moment from "moment";
import tealClosed from "../../public/tealclosed.png";
import tealOpen from "../../public/tealopen.png";

import "../../utilities.css";
import "./Envelope.css";

import IndividualLetterRead from "../pages/IndividualLetterRead";

//passed letter obj info and renders it

class Envelope extends Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount make the get request, store the letters somehow in a state
  handleClick = () => {
    // const letter_id = event.target.message;
    get("/api/letter", { letter_id: this.props.letter_id }).then((letterObj) => {
      navigate(`/letter/`, { state: { open_date: letterObj.open_date, letter_id: letterObj._id } });
    });
  };

  render() {
    let envelopeIcon = null;
    this.props.open_date <= moment().format("MM/DD/YYYY")
      ? (envelopeIcon = (
          <img
            src={tealClosed}
            alt="Closed"
            style={{
              marginTop: 40,
              width: 200,
              resizeMode: "contain",
              position: "relative",
            }}
            onClick={this.handleClick}
          />
        ))
      : (envelopeIcon = (
          <img
            src={tealOpen}
            alt="Open"
            style={{
              marginTop: 40,
              width: 200,
              resizeMode: "contain",
              position: "relative",
            }}
            onClick={this.handleClick}
          />
        ));

    return (
      <>
        <div className="u-textCenter">
          {envelopeIcon}
          <h3 className="Envelope-prompt"> {this.props.prompt} </h3>
        </div>
        ;
      </>
    );
  }
}
export default Envelope;
