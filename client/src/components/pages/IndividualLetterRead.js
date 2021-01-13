import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./IndividualLetterRead.css";
import "./Create.css";




class IndividualLetterRead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
        <h2 className = "IndividualLetterRead-prompt"> open when you've finished your website... </h2>
        <div className = "IndividualLetterRead-body">
            <h3>
                Dear An, <br></br>
                <p></p>
                I'm so happy to have worked with you on this website. Huevita es para siempre :) <br></br>
                <p></p>
                With love,<br></br>
                Kate
            </h3>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button Create-subDescription">
            <Link to="/read/" className="Create-link">
              return to all letters
            </Link>
          </button>
        </div>
    
        </>
    );
  }
}

export default IndividualLetterRead;