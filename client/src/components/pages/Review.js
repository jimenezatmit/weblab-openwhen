import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Review.css";

class Review extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When: Create";
  }

  render() {
    return (
      <>
        <h1 className="Thank-title u-textCenter">Review</h1>
      </>
    );
  }
}

export default Review;
