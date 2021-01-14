import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Letter.css";

/**
 * Letter is a component for holding message and creator/recipient
 *
 * Proptypes (?)
 * @param {string} creatorName
 * @param {string} letterID
 * @param {({letterID}) => void} onSubmit: (function) triggered when this letter is submitted, takes {letterID} as parameters
 */

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_date: "",
      message: "",
      package_id: "",
    //   recipient_email: "",
    //   sender_name: "",
      prompt: "",
      has_sent : false,
    };
  }

  // called whenever the user types in the recipient input field
  // updates the field that has changed
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  // called when the user hits "send letters!" to send letters
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    const body = { open_date : this.state.open_date, message: this.state.message, package_id : this.state.package_id, recipient_email : this.state.recipient_email, sender_name: this.state.sender_name, prompt: this.state.prompt, has_sent: this.state.has_sent}; //fields that we would save into api
    post("/api/letter", body);

    // this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      open_date: "",
      message: "",
      package_id: "",
    //   recipient_email: "",
    //   sender_name: "",
      prompt: "",
      has_sent : false,
    });
  };

  render() {
    return (
      <>
        <div>
            <form className="u-textCenter">
                <label className="Create-description" htmlFor="name">
                your name
                </label>
                <br></br>
                <input
                className="Create-field"
                name="sender_name"
                placeholder="First Last"
                type="text"
                id="name"
                onChange={this.handleChange}
                value={this.state.sender_name}
                ></input>
                <br></br>

                <label className="Create-description" htmlFor="email">
                recipient email
                </label>
                <br></br>
                <input
                className="Create-field"
                name="recipient_email"
                placeholder="test@example.com"
                type="text"
                id="email"
                onChange={this.handleChange}
                value={this.state.recipient_email}
                ></input>
                <br></br>
            </form>
        </div>
        <div>
            <form className="u-textCenter">
                <label className="Create-description" htmlFor="prompt">
                prompt
                </label>
                <div id="smallText">start your prompt with "open when"</div>
                <textarea
                className="Create-field"
                name="prompt"
                placeholder="open when _____"
                type="text"
                id="prompt"
                onChange={this.handleChange}
                value={this.state.prompt}
                ></textarea>
                <br></br>

                <label className="Create-description" htmlFor="date">
                open when date
                </label>
                <div id="smallText">set date to 00/00/0000 for forever unlocked</div>
                <input
                className="Create-field"
                name="open_date"
                placeholder="MM/DD/YYYY"
                type="text"
                id="date"
                onChange={this.handleChange}
                value={this.state.open_date}
                ></input>
                <br></br>

                <label className="Create-description" htmlFor="message">
                message
                </label>
                <br></br>
                <textarea
                className="Create-field"
                name="message"
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
          <button type="button" className="Create-button Create-subDescription">
            <Link to="/404" className="Create-link">
              add another letter
            </Link>
          </button>
        </div>

        <div className="u-textCenter">
          <button
            type="button"
            className="Create-button Create-subDescription"
            onClick={this.handleSubmit}
          >
            <Link to="/thankyou" className="Create-link">
              send letters!
            </Link>
          </button>
        </div>
      </>
    );
  }
}

/**
 * New Letter is a Letter component for new letters
 *
 * Proptypes
 * @param {string} creatorName
 * @param {string} letterID
 */

// class NewLetter extends Component {
//   addLetter = (value) => {
//     const body = { parent: this.props.letterID, content: value };
//     post("/api/letter", body).then((letter) => {
//       this.props.addNewLetter(letter);
//     });
//   };

//   render() {
//     return <Letter onSubmit={this.addLetter} />;
//   }
// }

// componentDidMount() {
//   get("/api/letter", { parent: this.props._id }).then((letter) => {
//     this.setState({
//       message: letter.message,
//       open_date: letter.open_date,
//       _id: letter._id,
//       recipient_email: letter.recipient_email,
//       sender_name: letter.sender_name,
//       prompt: letter.prompt,
//     });
//   });
// }

//   // this gets called when the user pushes "Submit", so their
//   // letter gets added right away
//   addNewLetter = (letterObj) => {
//     this.setState({
//       open_date: letterObj.open_date,
//       message: letterObj.message,
//       _id: letterObj._id,
//       recipient_email: letterObj.recipient_email,
//       sender_name: letterObj.sender_name,
//       prompt: letterObj.prompt,
//     });
//   };

//export default NewLetter;
export default Letter;
