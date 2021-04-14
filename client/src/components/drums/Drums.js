import React, { useState, useEffect, Component } from "react";
import ToolBar from "./DrumToolbar";
import Steps from "./DrumSteps";
import TrackList from "./DrumTrackList";

import PlayHead from "./DrumPlayHead";
import { Provider } from "../../hooks/useDrumStore";
import useTimer from "../../hooks/useTimer";
import useStyles from "../../hooks/useDrumStyles";

const Drums = () => {
  const baseBPMPerOneSecond = 60;
  const stepsPerBar = 16;
  const beatsPerBar = 4;
  const barsPerSequence = 1;
  const totalSteps = stepsPerBar * barsPerSequence;
  const totalBeats = beatsPerBar * barsPerSequence;

  const [BPM, setBPM] = useState(128);
  const [startDrumTime, setStartDrumTime] = useState(null);
  const [pastLapsedTime, setDrumPastLapse] = useState(0);
  const [currentStepID, setCurrentStep] = useState(null);
  const [getNotesAreaWidthInPixels] = useStyles(totalSteps);

  const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps);
  const timePerSequence = (baseBPMPerOneSecond / BPM) * 1000 * totalBeats;
  const timePerStep = timePerSequence / totalSteps;
  const isDrumSequencePlaying = startDrumTime !== null;
  const playerTime = useTimer(isDrumSequencePlaying);
  const lapsedTime = isDrumSequencePlaying
    ? Math.max(0, playerTime - startDrumTime)
    : 0;
  const totalLapsedTime = pastLapsedTime + lapsedTime;

  useEffect(() => {
    if (isDrumSequencePlaying) {
      setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps);
    } else {
      setCurrentStep(null);
    }
  }, [isDrumSequencePlaying, timePerStep, totalLapsedTime, totalSteps]);

  const toolBarProps = {
    setStartDrumTime,
    setDrumPastLapse,
    setBPM,
    isDrumSequencePlaying,
    startDrumTime,
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
          <h1 className="app_title">DRRRRUM</h1>
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

export default Drums;
