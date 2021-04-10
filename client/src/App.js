import React, { useState, Component } from 'react';
import logo from './orca-logo.png';
import './App.css';
import Osc1 from './components/Osc1';
import Creators from './components/creators';

const actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);


function App() {

  const [osc1Freq, setOsc1Freq] = useState(osc1.frequency.value)
  const changeOsc1Freq = event => {
    let {value} = event.target;
    setOsc1Freq(value);
    osc1.frequency.value = value;
  }
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">ORCA</h1>

          <h1 className="App-title">killer music app</h1>

          <div className="circle">
            <span></span>
            <img src={logo} className="App-logo" alt="logo" />
            <span> </span>




            <span></span>
            <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value}/>
            <button onClick={() => osc1.start()}>Toaster ON</button>

            <span></span>
            <button onClick={() => osc1.stop()}>Toaster OFF</button>
          </div>
        </header>
        <Creators />
      </div>


    );
}

export default App;
