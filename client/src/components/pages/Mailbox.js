import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Mailbox.css";

class Mailbox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When : Mailbox";
  }


  render() {
    return (
      <>
        <h1 className="u-textCenter">
          welcome to your mailbox
        </h1>
        {/* Goal: create two columns, one rendering package icon for created ones, other for received */}
        <div className = "Mailbox-row u-textCenter">
            <div className = "Mailbox-column" >
                <h2>
                created
                </h2>
               {/* all this stuff below should hopefully work but I can't test until we get the other parts working */}
                {/* get("/api/allcreatedpackages", {sender_id : this.props.user_id}).then( (packages) => {
                    // go through each package and render a PackageIcon accordingly
                    
                    packages.map((packageObj) => {
                        word_under =  "To:  ".concat(packageObj.recipient_email);
                        <PackageIcon package_id = {packageObj.package_id} word_under = {word_under}/>
                    })

                }) */}
            </div>
            <div className = "Mailbox-column">
                <h2>
                received
                </h2>
                 {/* all this stuff below should hopefully work but I can't test until we get the other parts working */}
             
                {/* get("/api/allreceivedpackages", {recipient_id : this.props.user_id}).then( (packages) => {
                    // go through each package and render a PackageIcon accordingly maybe via packages.map((package) => <PackageIcon ..../>)
                    packages.map((packageObj) => {
                        word_under =  "From:  ".concat(packageObj.sender_name);
                        <PackageIcon package_id = {packageObj.package_id} word_under = {word_under}/>
                    })
                }) */}
            </div>
        </div>
      </>
    );
  }
}

export default Mailbox;
