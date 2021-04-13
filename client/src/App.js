import React, { useState, useEffect, Component } from "react";
import Bass from "./components/bass/Bass";

import logo from "./orca-logo.png";
import "./App.css";
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">w e l c o m e t o o r c a</h1>
        <button onClick={() => osc1.start()}>on</button>
        <button onClick={() => osc1.stop()}>off</button>
        <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value} />
      </header>
      <Customers />
      <Bass />
    </div>
  );
}

export default App;
