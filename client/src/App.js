import React, { useState, useEffect, Component } from "react";
import ToolBar from "./components/bass/Toolbar";
import Steps from "./components/bass/Steps";
import TrackList from "./components/bass/TrackList";

import PlayHead from "./components/bass/PlayHead";
import { Provider } from "./hooks/useStore";
import useTimer from "./hooks/useTimer";
import useStyles from "./hooks/useStyles";

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

  const baseBPMPerOneSecond = 60;
  const stepsPerBar = 16;
  const beatsPerBar = 4;
  const barsPerSequence = 1;
  const totalSteps = stepsPerBar * barsPerSequence;
  const totalBeats = beatsPerBar * barsPerSequence;

  const [BPM, setBPM] = useState(128);
  const [startTime, setStartTime] = useState(null);
  const [pastLapsedTime, setPastLapse] = useState(0);
  const [currentStepID, setCurrentStep] = useState(null);
  const [getNotesAreaWidthInPixels] = useStyles(totalSteps);

  const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps);
  const timePerSequence = (baseBPMPerOneSecond / BPM) * 1000 * totalBeats;
  const timePerStep = timePerSequence / totalSteps;
  const isSequencePlaying = startTime !== null;
  const playerTime = useTimer(isSequencePlaying);
  const lapsedTime = isSequencePlaying
    ? Math.max(0, playerTime - startTime)
    : 0;
  const totalLapsedTime = pastLapsedTime + lapsedTime;

  useEffect(() => {
    if (isSequencePlaying) {
      setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps);
    } else {
      setCurrentStep(null);
    }
  }, [isSequencePlaying, timePerStep, totalLapsedTime, totalSteps]);

  const toolBarProps = {
    setStartTime,
    setPastLapse,
    setBPM,
    isSequencePlaying,
    startTime,
    BPM,
  };

  const playHeadProps = {
    notesAreaWidthInPixels,
    timePerSequence,
    totalLapsedTime,
  };

  const trackListProps = {
    currentStepID,
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
      <div className="bass">
        <Provider>
          <main className="app">
            <header className="app_header">
              <h1 className="app_title">B-B-BASS</h1>
              <ToolBar {...toolBarProps} />
            </header>
            <Steps count={totalSteps} />
            <div className="app_content">
              <PlayHead {...playHeadProps} />
              <TrackList {...trackListProps} />
            </div>
          </main>
        </Provider>
      </div>
    </div>
  );
}

export default App;
