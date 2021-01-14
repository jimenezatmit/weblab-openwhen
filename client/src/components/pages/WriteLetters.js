import React, { Component } from "react";
import { Link } from "@reach/router";
import Letter from "../modules/Letter.js";
import Package from "../modules/Package.js";

import "../../utilities.css";
import "./WriteLetters.css";

class WriteLetters extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   letter_count: [1],
    //   letter_list: [],
    // };
  }

  componentDidMount() {
    document.title = "Write Letters Page";
  }

  //   addLetter = (event) => {
  //     this.setState({
  //       letter_count: this.state.letter_count.concat(1),
  //     });
  //   };

  render() {
    //   there has to be a cleaner way of doing this line below -an
    // let letterList = this.state.letter_count.map((count) => <Letter></Letter>);

    return (
      <>
        <h1 className="Create-title u-textCenter">Write Letters</h1>
        <div id="subHeading">
          choose a prompt, choose an open when date, and write a letter to your recipient
        </div>
        <Letter packageID={"DUMMY ID"} />

        {/* {letterList} */}
      </>
    );
  }
}

export default WriteLetters;
