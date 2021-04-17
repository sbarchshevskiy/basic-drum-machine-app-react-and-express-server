import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";

import Session from "../components/Session";
import Nav from "../components/Nav";
import NewTrack from "../components/NewTrack";
import TrackList from "../components/TrackList";
import Login from "./Login";

import logo from "../orca-logo.png";
import Osc1 from "../components/Osc1";
import Customers from "../components/creators";

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
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <a href="" className="navbar-brand">Orca Records</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="" className="nav-link">Login</a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">w e l c o m e t o o r c a</h1>
        <button onClick={() => osc1.start()}>on</button>
        <button onClick={() => osc1.stop()}>off</button>
        <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value} />
      </header>
      <Customers />
    </div>
  );
}

export default App;

