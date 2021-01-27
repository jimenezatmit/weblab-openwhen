import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import moment from "moment";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./PreviewLetter.css";

class PreviewLetter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="u-textCenter">
          <h2 className="IndividualLetterRead-prompt"> prompt: {this.props.prompt} </h2>
          <h4 className="IndividualLetterRead-prompt"> open date: {this.props.open_date} </h4>
          <div className="Preview-body">
            <h3>{this.props.message}</h3>
          </div>
        </div>
      </>
    );
  }
}

export default PreviewLetter;
