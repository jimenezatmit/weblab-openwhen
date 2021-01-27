import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./HowItWorks.css";

class HowItWorks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1 className="Home-title u-textCenter u-margin">how it works</h1>

        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">1. login</h4>
        <div className="Home-description">
          press "get started" on the home page and log in with Google
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">2. create package</h4>
        <div className="Home-description">
          navigate to the "create" page and follow steps to create/edit/send letters
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">3. recipient views letters </h4>
        <div className="Home-description">
          click "get started", log in, navigate to the "mailbox" page, click on "add a package id"
          button and paste in code from email
        </div>
        <hr className="Home-line" />

        <br></br>
        <h1 className="Home-title u-textCenter">faq</h1>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">what is a package? what is a letter?</h4>
        <div className="Home-description">
          each letter has a prompt, "open when" date, and a message. when you make multiple letters
          at once for the same person, they are sent as a package via one email that has a link to
          view them all.
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">what is an "open when" date?</h4>
        <div className="Home-description">
          a letter's message only becomes visible upon the "open when" date, but you can also set
          the date to 00/00/0000 for it to be unlocked from the get-go
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle  Home-blueText">
          what will the recipient see if they try to view the letter before the "open when" date?
        </h4>
        <div className="Home-description">
          clicking on the closed envelope and prompt will take them to the letter-viewing page, but
          it will tell them when it will be unlocked instead of showing them the message
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">why can't the recipient find the email?</h4>
        <div className="Home-description">
          it's in their junk inbox, sadly. sender is: fromopenwhen@gmail.com
        </div>
        <hr className="Home-line" />
        <br></br>
        <h1 className="Home-title u-textCenter">about us</h1>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">An Jimenez and Kate Pearce </h4>
        <div className="Home-description">
          we are two MIT '21 gals who believe that small acts of kindness and thoughtful messages
          can brighten people's lives. we hope that this simple site encourages you to support,
          inspire, encourage, and celebrate your friends, family, employees, coworkers, or anyone at
          all!
        </div>
      </>
    );
  }
}

export default HowItWorks;
