import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import Envelope from "../modules/Envelope.js";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Read.css";
import IndividualLetterRead from "./IndividualLetterRead.js";

//passed letter obj info and renders it

class Envelopes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letterList: [],
      sender_name: "",
    };
  }

  componentDidMount() {
    document.title = "Open When: Read";
    get("/api/allletters", { package_id: this.props.location.state.package_id }).then((letters) => {
      console.log(letters);
      letters.map((letter) => {
        this.setState({
          letterList: this.state.letterList.concat([letter]),
          sender_name: letter.sender_name,
        });
      });
    });
  }

  handleReturn = () => {
    navigate(`/mailbox/`);
  };

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link>

        <h1 className="u-textCenter">
          {this.state.sender_name} sent you {this.state.letterList.length}{" "}
          {this.state.letterList.length > 1 ? "letters!" : "letter!"}
        </h1>
        <h2 className="Read-instruction"> Click on envelope to open </h2>
        <div>
          {/* <Envelope message = "Hi there" open_date = "01/01/2021" prompt = "sample prompt" /> */}
          {this.state.letterList.map((letter) => (
            <div>
              <Envelope
                open_date={letter.open_date}
                message={letter.message}
                prompt={letter.prompt}
                letter_id={letter._id}
                // onClick={this.handleClick}
              ></Envelope>
            </div>
          ))}
        </div>
        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.handleReturn}>
            return to mailbox
          </button>
        </div>
      </>
    );
  }
}
export default Envelopes;
