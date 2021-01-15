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
import Envelopes from "./pages/Envelopes.js"

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
    post("/api/logout");
  };

  render() {
    return (
      <>
        {/* put in div and fixed height, 100%-72 pixels */}
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />

        <Router>
          <NotFound default />
          <Home path="/" />
          <Create path="/create/" />
          <Read path="/read/" />
          <Envelopes path  =  "/envelopes/"/>
          <IndividualLetterRead path="/letter/" />
          <ThankYou path="/thankyou/" />
          <WriteLetters path="/writeletters" />
        </Router>
      </>
    );
  }
}

export default App;
