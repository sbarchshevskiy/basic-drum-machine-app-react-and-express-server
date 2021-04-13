import React, { useState, useEffect, Component } from "react";
import ToolBar from "./Toolbar";
import Steps from "./Steps";
import TrackList from "./TrackList";

import PlayHead from "./PlayHead";
import { Provider } from "../../hooks/useStore";
import useTimer from "../../hooks/useTimer";
import useStyles from "../../hooks/useStyles";

const Bass = () => {
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
  );
};

export default Bass;
