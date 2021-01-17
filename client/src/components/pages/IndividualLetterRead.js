import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import moment from 'moment'

import "../../utilities.css";
import "./IndividualLetterRead.css";
import "./Create.css";

class IndividualLetterRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
      message: "",
      package_id: "",
    };
  }

  componentDidMount() {
    document.title = "Letter Read Page";

    get("/api/letter", { letter_id: this.props.letter_id }).then((letterObj) => {
      this.setState({
        prompt: letterObj.prompt,
        message: letterObj.message,
        package_id: letterObj.package_id,
      });
    });
  }

  render() {
    return (
      <>
        <h2 className="IndividualLetterRead-prompt"> {this.state.prompt} </h2>
        <div className="IndividualLetterRead-body">
          <h3>{this.props.location.state.open_date  <= moment().format('MM/DD/YYYY') ? this.state.message : 'Letter not unlocked until '.concat(this.props.location.state.open_date).concat(". Check back then!")}</h3>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button Create-subDescription">
            <Link to={`/envelopes/${this.state.package_id}`} className="Create-link">
              return to all letters
            </Link>
          </button>
        </div>
      </>
    );
  }
}

export default IndividualLetterRead;
