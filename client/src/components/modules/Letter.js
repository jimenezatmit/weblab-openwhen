import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Letter.css";
import { post, get } from "../../utilities.js";

/**
 * Letter is a component for holding message and creator/recipient
 *
 * Proptypes (?)
 * @param {string} package_id
 */

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_date: "",
      message: "",
      package_id: "",
      prompt: "",
      sender_name: "",
      recipient_email: "",
    };
  }

  validateDate = (date) => {
    const re = /^\d{2}\/\d{2}\/\d{4}$/;
    return re.test(String(date));
  };

  validateMessage = (message) => {
    return message.length > 1;
  };

  // called whenever the user types in the recipient input field
  // updates the field that has changed
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault();

    let ready = false;
    if (this.validateDate(this.state.open_date) && this.validateMessage(this.state.message)) {
      ready = true;
    }

    if (!ready) {
      // problem is this only logs it in console but not to user
      console.log("Please complete the required fields before submitting.");
    } else {
      // fields that we would save into api
      const body = {
        open_date: this.state.open_date,
        message: this.state.message,
        package_id: this.props.package_id,
        prompt: this.state.prompt,
        sender_name: this.props.sender_name,
      };

      console.log(body);

      post("/api/letter", body).then(() => {
        console.log("letter to database");
        this.setState({
          open_date: "",
          message: "",
          package_id: "",
          prompt: "",
          recipient_email: "",
          sender_name: "",
        });
        <Letter
          package_id={this.props.package_id}
          sender_name={this.props.sender_name}
          recipient_email={this.props.sender_name}
        />;
      });
    }
  };

  handleFinalSubmit = (event) => {
    event.preventDefault();
    // this.handleSubmit();
    let ready = false;
    if (
      //   this.validatePrompt(this.state.prompt) &&
      this.validateDate(this.state.open_date) &&
      this.validateMessage(this.state.message)
    ) {
      ready = true;
    }

    if (!ready) {
      // problem is this only logs it in console but not to user
      console.log("Please complete the required fields before submitting.");
    } else {
      // fields that we would save into api
      const body = {
        open_date: this.state.open_date,
        message: this.state.message,
        package_id: this.props.package_id,
        prompt: this.state.prompt,
        sender_name: this.props.sender_name,
      };

      console.log(body);

      post("/api/letter", body).then(console.log("letter send to database"));

      const body2 = {
        recipient_email: this.props.recipient_email,
        sender_name: this.props.sender_name,
        package_id: this.props.package_id,
      };
      console.log("before email post");
      post("/api/email", body2).then(navigate(`/thankyou/`));
      console.log("after email post");
    }
  };

  render() {
    return (
      <>
        <div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="prompt">
              prompt*
            </label>
            <div id="smallText">start your prompt with "open when"</div>
            <textarea
              className="Create-field"
              name="prompt"
              required
              placeholder="open when _____"
              type="text"
              id="prompt"
              onChange={this.handleChange}
              value={this.state.prompt}
            ></textarea>
            <br></br>

            <label className="Create-description" htmlFor="date">
              open when date*
            </label>
            <div id="smallText">set date to 00/00/0000 for forever unlocked</div>
            <input
              className="Create-field"
              name="open_date"
              required
              placeholder="MM/DD/YYYY"
              type="text"
              id="date"
              onChange={this.handleChange}
              value={this.state.open_date}
            ></input>
            <br></br>

            <label className="Create-description" htmlFor="message">
              message*
            </label>
            <br></br>
            <textarea
              className="Create-field"
              name="message"
              required
              placeholder="write letter here"
              type="text"
              id="message"
              onChange={this.handleChange}
              value={this.state.message}
            ></textarea>
            <br></br>
          </form>
        </div>

        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.handleSubmit}>
            create another letter
          </button>
        </div>
        <br></br>
        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.handleFinalSubmit}>
            all done, send package
          </button>
        </div>
      </>
    );
  }
}

export default Letter;
