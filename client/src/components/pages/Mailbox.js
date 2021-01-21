import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";
import PackageIcon from "../modules/PackageIcon.js";

import "../../utilities.css";
import "./Mailbox.css";
import "./Home.css";

class Mailbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdPackages: null,
      receivedPackages: null,
    };
  }

  componentDidMount() {
    document.title = "Open When: Mailbox";

    // console.log(this.props.userID);

    get("/api/allcreatedpackages", { sender_id: this.props.userID }).then((packages) => {
      // go through each package and render a PackageIcon accordingly

      console.log(this.props.userID);

      packages.map((packageObj) => {
        word_under = "To:  ".concat(packageObj.recipient_email);
        this.setState({
          createdPackages: this.state.createdPackages.concat(
            <PackageIcon package_id={packageObj.package_id} word_under={word_under} />
          ),
        });
      });
    });

    {
      get("/api/allreceivedpackages", { recipient_id: this.props.userID }).then((packages) => {
        console.log(packages);

        // go through each package and render a PackageIcon accordingly maybe via packages.map((package) => <PackageIcon ..../>)
        packages.map((packageObj) => {
          word_under = "From:  ".concat(packageObj.sender_name);
          this.setState({
            receivedPackages: this.state.receivedPackages.concat(
              <PackageIcon package_id={packageObj.package_id} word_under={word_under} />
            ),
          });
        });
      });
    }
  }

  render() {
    return (
      <>
        <h1 className="u-textCenter">welcome to your mailbox</h1>
        {/* Goal: create two columns, one rendering package icon for created ones, other for received */}
        <div className="Mailbox-row u-textCenter">
          <div className="Mailbox-column">
            <h2>created</h2>
            {/* all this stuff below should hopefully work but I can't test until we get the other parts working */}
            {this.state.createdPackages}
            <button type="button" className="Home-newButton Home-description">
              <Link to="/create/" className="Home-link">
                create another package
              </Link>
            </button>
          </div>
          <div className="Mailbox-column">
            <h2>received</h2>
            {/* all this stuff below should hopefully work but I can't test until we get the other parts working */}

            {this.state.receivedPackages}
            <button type="button" className="Home-newButton Home-description">
              <Link to="/read/" className="Home-link">
                add a package ID
              </Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Mailbox;
