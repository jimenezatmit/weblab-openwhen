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
      createdPackages: [],
      receivedPackages: [],
    };
  }

  componentDidMount() {
    document.title = "Open When: Mailbox";

    console.log(this.state.userID);

    get("/api/allcreatedpackages", { sender_id: this.props.userID }).then((packages) => {
      // go through each package and render a PackageIcon accordingly

      console.log(packages);

      packages.map((packageObj) => {
        this.setState({
          createdPackages: this.state.createdPackages.concat(packageObj),
        });
        console.log(this.state.createdPackages);
      });
    });

    get("/api/allreceivedpackages", { recipient_id: this.props.userID }).then((packages) => {
      console.log(packages);

      // go through each package and render a PackageIcon accordingly maybe via packages.map((package) => <PackageIcon ..../>)
      packages.map((packageObj) => {
        this.setState({
          receivedPackages: this.state.receivedPackages.concat(packageObj),
        });
      });
    });
  }

  render() {
    let createdPackageList = this.state.createdPackages.map((packageObj) => (
      <PackageIcon
        package_id={packageObj._id}
        word_under={"To:  ".concat(packageObj.recipient_email)}
        type="create"
      />
    ));

    let receivedPackageList = this.state.receivedPackages.map((packageObj) => (
      <PackageIcon
        package_id={packageObj._id}
        word_under={"From:  ".concat(packageObj.sender_name)}
        type="read"
      />
    ));
    return (
      <>
        <h1 className="u-textCenter Mailbox-title">welcome to your mailbox</h1>
        {/* Goal: create two columns, one rendering package icon for created ones, other for received */}
        <div className="Mailbox-row">
          <div className="Mailbox-column">
            <h1 className="u-textCenter">created</h1>
            <button type="button" className="Mailbox-newButton Mailbox-description u-textCenter">
              <Link to="/create/" className="Mailbox-link u-textCenter">
                create another package
              </Link>
            </button>
            {createdPackageList}
          </div>
          <div className="Mailbox-column u-textCenter">
            <h1>received</h1>
            <button type="button" className="Mailbox-newButton Mailbox-description u-textCenter">
              <Link to="/read/" className="Mailbox-link">
                add a package ID
              </Link>
            </button>
            {receivedPackageList}
          </div>
        </div>
      </>
    );
  }
}

export default Mailbox;
