import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Session from "./components/Session";
import Nav from "./components/Nav";
import NewTrack from "./components/NewTrack";
import TrackList from "./components/TrackList";
import Login from "./pages/Login";
import Index from "./pages/index"

import logo from "./orca-logo.png";
import Osc1 from "./components/Osc1";
import Customers from "./components/creators";

const actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);

function App() {
  const [osc1Freq, setOsc1Freq] = useState(osc1.frequency.value);
  const changeOsc1Freq = (event) => {
    let { value } = event.target;
    setOsc1Freq(value);
    osc1.frequency.value = value;
  };

  return (
    <div className="App">  
      <Router>
        <div>
          <Route path="/sessions/:sessionID" component={Session} />
          <Route path="/users" />
          <Route exact path="/tracks/new" component={NewTrack} />
          <Route exact path="/tracks" component={TrackList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Index} />
        </div>
      </Router>
    </div>
  );
}

export default App;

