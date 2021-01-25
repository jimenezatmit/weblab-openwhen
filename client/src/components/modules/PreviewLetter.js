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
        <h2 className="IndividualLetterRead-prompt"> {this.props.prompt} </h2>
        <div className="IndividualLetterRead-body">
          <h3>{this.props.message}</h3>
          {this.props.open_date}
        </div>
      </>
    );
  }
}

export default PreviewLetter;
