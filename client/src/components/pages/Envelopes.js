import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import Envelope from "../modules/Envelope.js";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Read.css";
import IndividualLetterRead from "./IndividualLetterRead.js";


//passed letter obj info and renders it

class Envelopes extends Component {
  constructor(props) {
    super(props);
    this.state = {
         letterList : [],
        // open_dates : [],
        // messages : [],
        // prompts: []
    }
  }

  componentDidMount(){
      get("/api/letter", {package_id: "DUMMY ID"}).then((letters) => {
        //   letters.map(( letter) =>  this.props.letterList(letter)),
          letters.map((letter) => {
              this.setState({
                //   open_dates : this.state.open_dates.concat(letter.open_date), 
                //   messages : this.state.messages.concat(letter.message),
                //   prompts:  this.state.prompts.concat(letter.prompt)
                letterList: this.state.letterList.concat([letter])
              })
          
        console.log(this.state.letterList)
      })

    })
  }

  handleClick = ()=> {
    navigate("/letter/");
    <IndividualLetterRead
        message = "Testing"
        prompt =  "promting"
    ></IndividualLetterRead>
  }

  render() {
    return (
        <>

      <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossorigin="anonymous"
        ></link>
        <h1 className="u-textCenter"> {this.props.sender_name} has sent you a letter!</h1>
        <h2 className="Read-instruction"> Click on envelope to open </h2>
        {/* here we do something to get all letters (hopefully prop =  package_id, then do get("api/letter") 
        and render each Envelope */}
        
        <div>
        {/* <Envelope message = "Hi there" open_date = "01/01/2021" prompt = "sample prompt" /> */}
            {this.state.letterList.map((letter) => (
                    <div>
                        
                    <Envelope 
                        open_date = {letter.open_date}
                        message  = {letter.message}
                        prompt  = {letter.prompt}
                        onClick = {this.handleClick}           
                    ></Envelope>



                    </div>

            ))}
        </div>
            

        </>
    )
  }

}
export default Envelopes;