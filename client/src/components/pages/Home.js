import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Home Page";
  }

  render() {
    return (
      <>
        <h1 className="Home-title u-textCenter">open when...</h1>
        <div className="Home-description">
          send a package of virtual letters for special moments in their life (or another
          tagline/summary)
        </div>
        <div className="u-textCenter">
          <button type="button" className="Home-button Home-description">
            <Link to="/create/" className="Home-link">
              create
            </Link>
          </button>
          <button type="button" className="Home-button Home-description">
            <Link to="/read/" className="Home-link">
              read
            </Link>
          </button>
        </div>
        <h1 className="Home-title u-textCenter">how it works</h1>
        <hr className="Home-line" />
        <h4 className="Home-subTitle">step one: account setup and create</h4>
        <div className="Home-description">
          create an account, and navigate to the create page where you can select the number of
          letters and prompts.
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle">step two: write letters and customize tags</h4>
        <div className="Home-description">
          for each letter added to your package, select the "open when" date (either a specific date
          or forever) and write your letter in the fields provided.
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle">step three: send letters!</h4>
        <div className="Home-description">
          hit send letters at the bottom of the create page. your recipient will receive a
          notification about their package of letters, and they'll be able to open each one when
          their "open when" date arrives.
        </div>
        <hr className="Home-line" />
      </>
    );
  }
}

export default Home;
