import React, { Component } from "react";
import { Link } from "@reach/router";
import Letter from "../modules/Letter.js";

import "../../utilities.css";
import "./WriteLetters.css";

class WriteLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // package_id : this.props.location.state.package_id,
      // sender_name: this.props.location.state.sender_name,
      // recipient_email :  this.props.location.state.recipient_email
    }
    // this.state = {
    //   letter_list: [<Letter packageID="DUMMY ID" />],
    // };
  }

  componentDidMount() {
    document.title = "Open When: Create";
  }

  //   addLetter = (event) => {
  //     this.setState({
  //       letter_list: this.state.letter_list.concat(<Letter packageID="DUMMY ID" />),
  //     });
  //   };

  handleSubmit = (event) => {
    event.preventDefault();

    // //   for each letter, we want to submit it to the database using handleSubmit function from Letter object (which is not possible)
    // this.state.letter_list.map((letter) => letter.handleSubmit);

    this.setState({
      letter_list: "",
    });
  };



  render() {
    //   there has to be a cleaner way of doing this line below -an
    // let letterList = this.state.letter_count.map((count) => <Letter packageID="DUMMY ID" />);

    return (
      <>
        <h1 className="Create-title u-textCenter">Write Letters</h1>
        <div id="subHeading">
          choose a prompt, choose an open when date, and write a letter to your recipient
        </div>

        {/* {this.state.letter_list} */}
        <Letter
          package_id={this.props.location.state.package_id}
          sender_name={this.props.location.state.sender_name}
          recipient_email={this.props.location.state.recipient_email}
        />


          
        
      </>
    );
  }
}

export default WriteLetters;
