import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import moment from "moment";

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
    return (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link>
        <div className="Envelope-centeredAndBlue">
          {this.props.open_date <= moment().format("MM/DD/YYYY")
              ? //closed until the date, closed envelope
              <div>
              <i onClick={this.handleClick} className="far fa-envelope-open fa-10x"></i>
              <h3 className="Envelope-prompt"> {this.props.prompt} </h3>
              </div>
              :
              <div>
              <i onClick={this.handleClick} className="far fa-envelope fa-10x"></i>
              <h3 className="Envelope-prompt"> {this.props.prompt} </h3>
              </div>
          }
          </div>
      </>
    );
  }
}
export default Envelope;
