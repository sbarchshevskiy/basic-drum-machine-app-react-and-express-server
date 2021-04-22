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
import AudioVisualizer from './AudioVisualizer';

//const actx = new AudioContext();
const actx = new (window.AudioContext || window.webkitAudioContext)();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [audioData, setAudioData] = useState( new Uint8Array());
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    let analyser = actx.createAnalyser();
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    gain1.connect(analyser);
    analyser.getByteTimeDomainData(dataArray);
    
    console.log(dataArray);
    
    setAudioData(dataArray);

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [state, setState] = useState({ 
    mute: "off",
    num_likers : 0
  })
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
  
  function voiceMute() {
    if (state.mute =="off"){
      gain1.gain.setValueAtTime(0, actx.currentTime);
      setState({...state, mute: "on"});
    }  else{
      gain1.gain.setValueAtTime(1, actx.currentTime);
      setState({...state, mute: "off"});
    }
  }

  function like(trackid) {
    setState({ ...state, num_likers: state.num_likers+1 });
    let email = "test@test.com";
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token 1234abcd');
    fetch("http://localhost:5000/api/like", {
      credentials: 'include',
      method: "post",
      mode: "no-cors",
      headers: myHeaders,

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: email,
        trackid: trackid
      })
    })
    .then( (response) => { 
      //do something awesome here
    });
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">w e l c o m e t o o r c a</h1>
      </header>
      <div className="track-previw">
        <AudioVisualizer audioData={audioData} />
      </div>
      <div className="trk">
        <button onClick={() => osc1.start()}>on</button>
        <button onClick={() => osc1.stop()}>off</button>
        <button className="mute" onClick={voiceMute}>mute</button>
        <button onClick={() => like(0)}>like({ state.num_likers })</button>
        <button>comment</button>
        
        <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value} />
      </div>
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

