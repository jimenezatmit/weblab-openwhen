import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
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
// import Login from "./pages/Login.js";
import Mailbox from "./pages/Mailbox.js";

import "../utilities.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").then(() => {
      navigate(`/`);
    });
  };

  render() {
    return (
      <>
        {/* put in div and fixed height, 100%-72 pixels */}

        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userID={this.state.userId}
        />

        <Router>
          <NotFound default />
          <Home path="/" userID={this.state.userId} />
          <Create path="/create/" userID={this.state.userId} />
          <Read path="/read/" userID={this.state.userId} />
          <Envelopes path="/envelopes/" userID={this.state.userId} />
          <IndividualLetterRead path="/letter/" />
          <ThankYou path="/thankyou/" />
          <WriteLetters path="/writeletters/" />
          <HowItWorks path="/howitworks/" />

          {this.state.userId ? 
	 
          <Mailbox path="/mailbox/" userID={this.state.userId} />
          :
          null}
        </Router>
      </>
    );
  }
}

export default App;
