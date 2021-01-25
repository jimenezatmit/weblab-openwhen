import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import LetterIcon from "../modules/LetterIcon.js";
import PreviewLetter from "../modules/PreviewLetter.js";

import { post, get } from "../../utilities.js";

import "../../utilities.css";
import "./Review.css";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_letter: null,
      letter_list: [],
    };
  }

  componentDidMount() {
    document.title = "Open When: Create";
    get("/api/allletters", { package_id: this.props.location.state.package_id }).then((letters) => {
      letters.map((letter) => {
        let renderedLetter = (
          <PreviewLetter
            open_date={letter.open_date}
            prompt={letter.prompt}
            message={letter.message}
          />
        );
        this.setState({
          letter_list: this.state.letter_list.concat(renderedLetter),
        });
      });
    });
  }

  renderLetter = (index) => {
    this.setState({
      current_letter: this.state.letter_list[index],
    });
  };

  backPage = () => {
    navigate(`/writeletters/`, {
      state: {
        sender_name: this.props.location.state.sender_name,
        package_id: this.props.location.state.package_id,
        recipient_email: this.props.location.state.recipient_email,
        new_package: false,
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
    let letterPile = null;
    letterPile = this.state.letter_list.map((letter, index) => (
      <LetterIcon index={index} handleClick={this.renderLetter}></LetterIcon>
    ));

    let singleLetter = null;
    if (this.state.current_letter != null) singleLetter = this.state.current_letter;

    return (
      <>
        <h1 className="Write-title u-textCenter">Review</h1>
        <div className="Write-container">
          <div>{singleLetter}</div>
          <div>{letterPile}</div>
        </div>
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
