import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1 className="Create-title u-textCenter">Create</h1>
        <div id="subHeading">
          enter the fields below to write letters to send to your recipient!
        </div>
        <div>
          <form className="u-textCenter">
            <label className="Create-description" for="name">
              your name
            </label>
            <br></br>
            <input
              className="Create-field"
              placeholder="First Last"
              type="text"
              id="name"
              name="name"
            ></input>
            <br></br>

            <label className="Create-description" for="email">
              recipient email
            </label>
            <br></br>
            <input
              className="Create-field"
              placeholder="test@example.com"
              type="text"
              id="email"
              name="email"
            ></input>
            <br></br>

            <label className="Create-description" for="prompt">
              prompt
            </label>
            <div id="smallText">start your prompt with "open when"</div>
            <textarea
              className="Create-field"
              placeholder="open when _____"
              type="text"
              id="prompt"
              name="prompt"
            ></textarea>
            <br></br>

            <label className="Create-description" for="date">
              open when date
            </label>
            <div id="smallText">set date to 00/00/0000 for forever unlocked</div>
            <input
              className="Create-field"
              placeholder="MM/DD/YYYY"
              type="text"
              id="date"
              name="date"
            ></input>
            <br></br>

            <label className="Create-description" for="message">
              message
            </label>
            <br></br>
            <textarea
              className="Create-field"
              placeholder="write letter here"
              type="text"
              id="messasge"
              name="message"
            ></textarea>
            <br></br>
          </form>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button Create-subDescription">
            <Link to="/404" className="Create-link">
              add another letter
            </Link>
          </button>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button Create-subDescription">
            <Link to="/404" className="Create-link">
              send letters!
            </Link>
          </button>
        </div>
      </>
    );
  }
}

export default Create;
