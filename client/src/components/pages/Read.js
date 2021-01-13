import React, { Component } from "react";
import {Link} from "@reach/router";
import {Router} from "@reach/router";
import { navigate } from "@reach/router";


import "../../utilities.css";
import "./Read.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'



class Read extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            
      <>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous"></link>
        <h1 className = "u-textCenter"> Kate has sent you a letter!</h1>
        <h2 className = "Read-instruction"> Click on envelope to open </h2>
        <div className = "Read-envelopeCentered Read-envelopeBlue">
            <i onClick={() => navigate("/letter/")} className="far fa-envelope fa-10x "></i>
        </div>
        <h3 className = "Read-prompt"> open when you've finished your website... </h3>
      </>
    );
  }
}

export default Read;
