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
      showError: null,
    };
  }

  componentDidMount() {
    console.log("LWETTERDI", this.props.letter_id);
    if (this.props.letter_id) {
      get("/api/letter", { letter_id: this.props.letter_id }).then((letterObj) => {
        this.setState(
          {
            open_date: letterObj.open_date,
            message: letterObj.message,
            package_id: letterObj.package_id,
            prompt: letterObj.prompt,
            sender_name: letterObj.sender_name,
          },
          () => console.log(this.state.message)
        );
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.letter_id !== prevProps.letter_id) {
      get("/api/letter", { letter_id: this.props.letter_id }).then((letterObj) => {
        this.setState(
          {
            open_date: letterObj.open_date,
            message: letterObj.message,
            package_id: letterObj.package_id,
            prompt: letterObj.prompt,
            sender_name: letterObj.sender_name,
          },
          () => console.log(this.state.message)
        );
      });
    }
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
    event.preventDefault();

    if (this.validateDate(this.state.open_date) && this.validateMessage(this.state.message)) {
      // fields that we would save into api
      const body = {
        open_date: this.state.open_date,
        message: this.state.message,
        package_id: this.props.package_id,
        prompt: this.state.prompt,
        sender_name: this.props.sender_name,
      };

      console.log(body);

      post("/api/letter", body).then((result) => {
        console.log("letter to database, id:", result._id);

        // add letter to letterList in Parent component
        this.props.complete_function(result._id);
      });
    } else {
      this.setState({
        showError: true,
      });
    }
  };

  handleUpdate = (event) => {
    event.preventDefault();

    if (this.validateDate(this.state.open_date) && this.validateMessage(this.state.message)) {
      // fields that we would save into api
      const body = {
        open_date: this.state.open_date,
        message: this.state.message,
        // package_id: this.props.package_id,
        prompt: this.state.prompt,
        letter_id: this.props.letter_id,
        // sender_name: this.props.sender_name,
      };

      get("/api/updateletter", body).then((result) => {
        console.log("letter to database, id:", result._id);

        // add letter to letterList in Parent component
        this.props.update_function(result._id, this.props.index);
      });
    } else {
      this.setState({
        showError: true,
      });
    }
  };

  handleDelete = (event) => {
    event.preventDefault();

    const body = {
      letter_id: this.props.letter_id,
    };

    this.props.delete_function(this.props.index);

    post("/api/deleteletter", body);
  };

  render() {
    let finishButton = this.props.letter_id ? (
      <div className="u-textCenter">
        <button type="button" className="subHeading Letter-button" onClick={this.handleUpdate}>
          update letter
        </button>
        <button type="button" className="subHeading Letter-button" onClick={this.handleDelete}>
          delete letter
        </button>
      </div>
    ) : (
      <button type="button" className="subHeading Create-button" onClick={this.handleSubmit}>
        complete letter
      </button>
    );

    return (
      <>
        <div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="prompt">
              prompt*
            </label>
            <div id="smallText">you can start your prompt with "open when..."</div>
            <textarea
              className="Create-field Letter-promptField"
              name="prompt"
              required
              placeholder="open when _____"
              type="text"
              id="prompt"
              onChange={this.handleChange}
              value={this.state.prompt}
            ></textarea>
            <br></br>

            <label className="Create-description" htmlFor="message">
              message*
            </label>
            <br></br>
            <textarea
              className="Create-field Letter-messageField"
              name="message"
              required
              placeholder="write letter here"
              type="text"
              id="message"
              onChange={this.handleChange}
              value={this.state.message}
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
          </form>
        </div>

        <div className="u-textCenter">
          {this.state.showError ? (
            <h4>
              Please complete the fields above before proceeding and make sure the date is in the
              correct format (MM/DD/YYYY).
            </h4>
          ) : null}
          {/* <button type="button" className="Create-button" onClick={this.handleSubmit}>
            create another letter
          </button> */}
        </div>
        <br></br>
        <div className="u-textCenter">{finishButton}</div>
      </>
    );
  }
}

export default Letter;
