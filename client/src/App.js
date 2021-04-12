import React, {useState, Component} from 'react';
import logo from './orca-logo.png';
import Styling from './components/Styling'
import './App.css';
import Osc1 from './components/Osc1';
import Creators from './components/creators';
import ReactRecorder from './components/ReactRecorder';


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
    < ReactRecorder />

    <header className="App-header">
        <h1 className="App-title">killer music app</h1>
        <div className="circle">
          <button onClick={() => osc1.start()}>Toaster ON</button>
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => osc1.stop()}>Toaster OFF</button>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>


    <body >
      <Osc1 changeFreq={changeOsc1Freq} freq={osc1.frequency.value}/>
      <Styling />
      <Creators />
      </body>
    </div>
  );
}

export default App;

