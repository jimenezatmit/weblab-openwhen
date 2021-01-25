import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import LetterIcon from "../modules/LetterIcon.js";
import Letter from "../modules/Letter.js";

import "../../utilities.css";
import "./Review.css";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_letter: "",
    };
  }

  componentDidMount() {
    document.title = "Open When: Create";
    console.log(this.props.location.state.recipient_email);
  }

  renderLetter = (index) => {
    this.setState({
      current_letter: this.props.location.state.letter_list[index],
    });
  };

  backPage = () => {
    navigate(`/writeletters/`, {
      state: {
        sender_name: this.props.location.state.sender_name,
        package_id: this.props.location.state.package_id,
        recipient_email: this.props.location.state.recipient_email,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      recipient_email: this.props.location.state.recipient_email,
      sender_name: this.props.location.state.sender_name,
      package_id: this.props.location.state.package_id,
    };

    console.log("before email post");

    post("/api/email", body).then(navigate(`/thankyou/`));

    console.log("after email post");
  };

  render() {
    // let letterPile = null;
    // letterPile = this.props.location.state.letter_list.map((letter, index) => (
    //   <LetterIcon index={index} handleClick={this.renderLetter}></LetterIcon>
    // ));
    return (
      <>
        <h1 className="Thank-title u-textCenter">Review</h1>
        {/* {letterPile} */}
        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.backPage}>
            back to edit
          </button>
        </div>
        <br></br>
        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.handleSubmit}>
            submit
          </button>
        </div>
      </>
    );
  }
}

export default Review;
