import React, { useState, useEffect, Component, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import fire from "./fire";
import useUserData from "./hooks/useUserData";
import useSessionData from "./hooks/useSessionData";
import useTrackData from "./hooks/useTrackData";
import Styling from "./components/Styling";

import Session from "./components/Session";
import Nav from "./components/Nav";
import NewTrack from "./components/NewTrack";
import TrackList from "./components/TrackList";
import ContribTrackList from "./components/ContribTrackList";

import logo from "./orca-logo.png";
import Osc1 from "./components/Osc1";
import Creators from "./components/creators";
import ClientIO from "./components/ClientIO";
import DraggableElement from "./components/DraggableElement";

const actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { state } = useUserData();
  // console.log("STATE USER DATA: ", state.userData);

  const { sessionInfo } = useSessionData();
  // console.log("STATE SESSION DATA: ", sessionInfo.sessionData);

  const { trackInfo } = useTrackData();
  // console.log("STATE TRACK DATA: ", trackInfo);

  const currentUser = useUserData().state.userData.find(
    (userObj) => userObj.email === user.email
  );

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.mesage);
            break;
          case "auth/wrong-password":
            setPasswordError(err.mesage);
            break;
        }
      });
    setShowLogin(false);
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
          case "auth/user-not-found":
            setEmailError(err.mesage);
            break;
          case "auth/weak-password":
            setPasswordError(err.mesage);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

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
        <h1 className="App-title">w e l c o m e - t o - o r c a</h1>
        {/* <button onClick={() => osc1.start()}>on</button>
        <button onClick={() => osc1.stop()}>off</button> */}
        {/* <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value} /> */}
      </header>
      <Styling></Styling>

      {/*<Creators />*/}
      <Router>
        <Nav
          user={user}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />

        <div>
          <Route path="/sessions/:sessionID">
            <Session
              user={user}
              state={state}
              sessionInfo={sessionInfo}
              trackInfo={trackInfo}
            />
          </Route>
          <Route path="/collaborations">
            <ContribTrackList userData={currentUser} />
          </Route>
          <Route path="/users" />
          <Route exact path="/tracks/new" component={NewTrack} />
          <Route exact path="/tracks" component={TrackList} />
          <Route exact path="/" />
        </div>
      </Router>
      <div className="container">
        <DraggableElement>
          <ClientIO />
        </DraggableElement>
      </div>
    </div>
  );
}

export default App;
