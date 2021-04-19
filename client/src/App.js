import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

import Session from "./components/Session";
import Nav from "./components/Nav";
import NewTrack from "./components/NewTrack";
import TrackList from "./components/TrackList";

import logo from "./orca-logo.png";
import Osc1 from "./components/Osc1";
import Customers from "./components/creators";
import Login from './Login'
import Register from './Register'

import AuthService from "./services/auth.service";

const actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const [osc1Freq, setOsc1Freq] = useState(osc1.frequency.value);
  const changeOsc1Freq = (event) => {
    let { value } = event.target;
    setOsc1Freq(value);
    osc1.frequency.value = value;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">w e l c o m e t o o r c a</h1>
        <button onClick={() => osc1.start()}>on</button>
        <button onClick={() => osc1.stop()}>off</button>
        <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value} />
      </header>
      <Customers />
      <Router>
        <Nav currentUser={currentUser} setShowModal={setShowModal} logOut={logOut} />

        <div id="popupModal" className="overlay" style={{visibility: showModal ? 'visible' : 'hidden', opacity: showModal ? 1 : 0}}>
          <div className="popup">
            <a className="close" href="#" onClick={closeModal}>&times;</a>
            {!hasAccount ? (
                <Login hasAccount={hasAccount} setHasAccount={setHasAccount} />
            ) : (
                <Register hasAccount={hasAccount} setHasAccount={setHasAccount} />
            )}
          </div>
        </div>

        <div>
          <Switch>
            <Route exact path="/" />
            {/*<Route exact path="/login" component={Login} />*/}
            {/*<Route exact path="/register" component={Register} />*/}
            <Route path="/sessions/:sessionID" component={Session} />
            <Route path="/users" />
            <Route exact path="/tracks/new" component={NewTrack} />
            <Route exact path="/tracks" component={TrackList} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

