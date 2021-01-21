import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";

import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Create from "./pages/Create.js";
import Read from "./pages/Read.js";
import IndividualLetterRead from "./pages/IndividualLetterRead.js";
import ThankYou from "./pages/ThankYou.js";
import WriteLetters from "./pages/WriteLetters.js";
import Envelopes from "./pages/Envelopes.js";
import HowItWorks from "./pages/HowItWorks.js";
import Mailbox from "./pages/Mailbox.js";


import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import GoogleLogin, { GoogleLogout } from "react-google-login";


const GOOGLE_CLIENT_ID = "158742950516-7n744r6o2q6mrvfiel2i1lrgno87rucv.apps.googleusercontent.com";


/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      user_id: undefined,
    };
  }

  componentDidMount() {
    //   get("/api/whoami").then((user) => {
    //   if (user._id) {
    //   //they are registed in the database, and currently logged in.
    //     this.setState({ user_id: user._id });
    // }
    //});
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ user_id: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ user_id: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        {/* put in div and fixed height, 100%-72 pixels */}
        <NavBar>
        <div className="u-textCenter">
          <h1 className="Login-title u-textCenter">Login</h1>
          {this.state.user_id ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login "
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={(err) => console.log(err)}
              onClick={this.handleClick}
              className=" NavBar-link NavBar-login"
            />
          )}
        </div>
        </NavBar>
         
        
      

        <Router>
          <NotFound default />
          <Home user_id = {this.state.user_id} path="/" />
          <Create user_id = {this.state.user_id} path="/create/" />
          <Read user_id = {this.state.user_id} path="/read/" />
          <Envelopes user_id = {this.state.user_id} path="/envelopes/:package_id" />
          <IndividualLetterRead user_id = {this.state.user_id} path="/letter/" />
          {/* <ThankYou path="/thankyou/" /> */}
          <WriteLetters user_id = {this.state.user_id} path="/writeletters/" />
          <HowItWorks user_id = {this.state.user_id} path="/howitworks/" />
          <Mailbox user_id = {this.state.user_id} path="/mailbox/" />
          {/* <Login path="/login/:nextpage" /> */}
      
        </Router>
      </>
    );
  }
}

export default App;
