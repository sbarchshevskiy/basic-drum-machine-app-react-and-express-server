import React, { useState, useEffect, Component } from "react";
import ToolBar from "./Toolbar";
import Steps from "./Steps";
import TrackList from "./TrackList";

import PlayHead from "./PlayHead";
import { Provider } from "../../hooks/useBassStore";
import useTimer from "../../hooks/useTimer";
import useStyles from "../../hooks/useBassStyles";

const Bass = () => {
  const baseBPMPerOneSecond = 60;
  const stepsPerBar = 16;
  const beatsPerBar = 4;
  const barsPerSequence = 1;
  const totalSteps = stepsPerBar * barsPerSequence;
  const totalBeats = beatsPerBar * barsPerSequence;

  const [BPM, setBPM] = useState(128);
  const [startBassTime, setStartBassTime] = useState(null);
  const [pastLapsedTime, setBassPastLapse] = useState(0);
  const [currentStepID, setCurrentStep] = useState(null);
  const [getNotesAreaWidthInPixels] = useStyles(totalSteps);

  const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps);
  const timePerSequence = (baseBPMPerOneSecond / BPM) * 1000 * totalBeats;
  const timePerStep = timePerSequence / totalSteps;
  const isBassSequencePlaying = startBassTime !== null;
  const playerTime = useTimer(isBassSequencePlaying);
  const lapsedTime = isBassSequencePlaying
    ? Math.max(0, playerTime - startBassTime)
    : 0;
  const totalLapsedTime = pastLapsedTime + lapsedTime;

  useEffect(() => {
    if (isBassSequencePlaying) {
      setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps);
    } else {
      setCurrentStep(null);
    }
  }, [isBassSequencePlaying, timePerStep, totalLapsedTime, totalSteps]);

  const toolBarProps = {
    setStartBassTime,
    setBassPastLapse,
    setBPM,
    isBassSequencePlaying,
    startBassTime,
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
  );
};

export default Bass;
