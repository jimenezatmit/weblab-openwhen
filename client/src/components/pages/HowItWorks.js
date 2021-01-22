import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Home.css";

class HowItWorks extends Component {
  constructor(props) {
    super(props);
  }

render() {
return (
    <>
        <h1 className="Home-title u-textCenter" >how it works</h1>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">step one: create package</h4>
        <div className="Home-description">
          navigate to the "create" page where you can input your name and the recipient's email
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">step two: write letters and customize tags</h4>
        <div className="Home-description">
          for each letter added to your package, select the "open when" date and write your message
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">step three: send letters!</h4>
        <div className="Home-description">
          hit "all done, send letters" button at the bottom of the "create" page to send package
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">step four: recipient views letters! </h4>
        <div className="Home-description">
          the recipient receives an email with a link and code to view their letters 
        </div>
        <hr className="Home-line" />
        <br></br>
        <h1 className="Home-title u-textCenter">faq</h1>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">what is a package? what is a letter?</h4>
        <div className="Home-description">
          each letter has a prompt, "open when" date, and a message. when you make multiple letters at once for the same person, they are sent as a package via one email that has a link to view them all.
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">what is an "open when" date?</h4>
        <div className="Home-description">
          a letter's message only becomes visible upon the "open when" date, but you can also set the date to 00/00/0000 for it to be unlocked from the get-go
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle  Home-blueText">what will the recipient see if they try to view the letter before the "open when" date?</h4>
        <div className="Home-description">
          clicking on the envelope and prompt will take them to the letter-viewing page, but it will tell them when it will be unlocked instead of showing them the message
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">why can't the recipient find the email?</h4>
        <div className="Home-description">
          it's in their junk inbox :( sender is fromopenwhen@gmail.com
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">why won't it let me click the button?</h4>
        <div className="Home-description">
          the form requires certain formatting or it won't let you move on, check the instructions and try again (note: MM/DD/YYYY for date!)
        </div>
        <hr className="Home-line" />
        <h4 className="Home-subTitle Home-blueText">why did you make this site?</h4>
        <div className="Home-description">
          we are An and Kate, two gals who believe that small acts of kindness and thoughtful messages can brighten people's lives. we hope that this simple site encourages you to support, inspire, encourage, and celebrate your friends, family, employees, coworkers, or anyone at all! 
        </div>
      </>
    );
  }
}

export default HowItWorks;