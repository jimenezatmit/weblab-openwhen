import React, { Component } from "react";
import { Router, Location, navigate } from "@reach/router";
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
import Review from "./pages/Review.js";

import "../utilities.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

class OnRouteChangeWorker extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.action();
    }
  }

  render() {
    return null;
  }
}

const OnRouteChange = ({ action }) => (
  <Location>
    {({ location }) => <OnRouteChangeWorker location={location} action={action} />}
  </Location>
);

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
        
        
        <NavBar handleLogout={this.handleLogout} userID={this.state.userId} />

        <Router>
          <NotFound default />
          <Home path="/" userID={this.state.userId} handleLogin={this.handleLogin} />
          <HowItWorks path="/howitworks/" />
          <Review path="/review/" />

          {this.state.userId ? (
            <Mailbox path="/mailbox/" userID={this.state.userId} />
          ) : (
            <NotFound default />
          )}
          {this.state.userId ? (
            <Create path="/create/" userID={this.state.userId} />
          ) : (
            <NotFound default />
          )}
          {this.state.userId ? (
            <Read path="/read/" userID={this.state.userId} />
          ) : (
            <NotFound default />
          )}
          {this.state.userId ? (
            <Envelopes path="/envelopes/" userID={this.state.userId} />
          ) : (
            <NotFound default />
          )}
          {this.state.userId ? <IndividualLetterRead path="/letter/" /> : <NotFound default />}
          {this.state.userId ? <WriteLetters path="/writeletters/" /> : <NotFound default />}
          {this.state.userId ? <ThankYou path="/thankyou/" /> : <NotFound default />}
          {this.state.userId ? <Review path="/review/" /> : <NotFound default />}
        </Router>
        <OnRouteChange
          action={() => {
            window.scrollTo(0, 0);
          }}
        />
      </>
    );
  }
}

export default App;
