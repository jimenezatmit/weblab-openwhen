import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import Letter from "../modules/Letter.js";
import LetterIcon from "../modules/LetterIcon.js";

import "../../utilities.css";
import "./WriteLetters.css";

class WriteLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter_list: [],
      current_letter: (
        <Letter
          package_id={this.props.location.state.package_id}
          sender_name={this.props.location.state.sender_name}
          recipient_email={this.props.location.state.recipient_email}
          index={0}
        />
      ),
    };
  }

  // createLetterObject = () => {
  //   let sender_name = this.props.location.state.sender_name;
  //   let package_id = this.props.location.state.package_id;
  //   let recipient_email = this.props.location.state.recipient_email;

  //   return (
  //     <Letter
  //       package_id={this.props.location.state.package_id}
  //       sender_name={this.props.location.state.sender_name}
  //       recipient_email={this.props.location.state.recipient_email}
  //     />
  //   );
  // };

  componentDidMount() {
    document.title = "Open When: Create";

    // this.setState({
    //   current_letter: this.createLetterObject(),
    // });
  }

  completeLetter = (event) => {
    event.preventDefault();

    this.setState(
      {
        letter_list: this.state.letter_list.concat(this.state.current_letter),
        current_letter: null,
      },
      // () => console.log(this.state.letter_list)
      this.setState({ current_letter: null })
    );

    // console.log(this.state.letter_list);
    // console.log(this.state.current_letter);

    // this.setState({
    //   current_letter: null,
    // });
  };

  addLetter = (event) => {
    event.preventDefault();

    this.setState(
      {
        current_letter: (
          <Letter
            package_id={this.props.location.state.package_id}
            sender_name={this.props.location.state.sender_name}
            recipient_email={this.props.location.state.recipient_email}
            index={this.state.letter_list.length}
          />
        ),
      },
      () => console.log(this.state.current_letter)
    );
  };

  nextPage = (event) => {
    event.preventDefault();
    navigate(`/review/`);
  };

  handleLetterClick = (index) => {
    this.setState(
      {
        current_letter: this.state.letter_list[index],
      },
      () => console.log(this.state.current_letter)
    );
  };

  render() {
    let letterPile = null;
    letterPile = this.state.letter_list.map((letter, index) => (
      <LetterIcon index={index} handleClick={this.handleLetterClick}></LetterIcon>
    ));

    let presentLetter = this.state.current_letter;

    return (
      <>
        <h1 className="Create-title u-textCenter">Write Letters</h1>
        <div id="subHeading">
          choose a prompt, choose an open when date, and write a letter to your recipient
        </div>

        <div className="Write-container">
          <div className="u-textCenter">
            {presentLetter}
            <button type="button" className="Create-button" onClick={this.completeLetter}>
              complete
            </button>
          </div>
          <div>
            <div id="subHeading">your letters</div>
            {letterPile}
            <button type="button" className="Create-button" onClick={this.addLetter}>
              add another letter
            </button>
          </div>
        </div>
        <div className="u-textCenter">
          <button type="button" className="Create-button" onClick={this.nextPage}>
            next
          </button>
        </div>
      </>
    );
  }
}

export default WriteLetters;
