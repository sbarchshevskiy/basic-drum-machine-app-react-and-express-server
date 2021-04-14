import React, { useState, useEffect, Component } from "react";
import ToolBar from "./SynthToolbar";
import Steps from "./SynthSteps";
import TrackList from "./SynthTrackList";

import PlayHead from "./SynthPlayHead";
import { Provider } from "../../hooks/useSynthStore";
import useTimer from "../../hooks/useTimer";
import useStyles from "../../hooks/useSynthStyles";

const Synth = ({
  startSynthTime,
  setSynthstartSynthTime,
  pastSynthLapsedTime,
  setSynthPastLapse,
  isSynthSequencePlaying,
}) => {
  const baseBPMPerOneSecond = 60;
  const stepsPerBar = 16;
  const beatsPerBar = 4;
  const barsPerSequence = 1;
  const totalSteps = stepsPerBar * barsPerSequence;
  const totalBeats = beatsPerBar * barsPerSequence;

  const [BPM, setBPM] = useState(128);
  // const [startSynthTime, setSynthstartSynthTime] = useState(null);
  // const [pastSynthLapsedTime, setSynthPastLapse] = useState(0);
  const [currentStepID, setCurrentStep] = useState(null);
  const [getNotesAreaWidthInPixels] = useStyles(totalSteps);

  const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps);
  const timePerSequence = (baseBPMPerOneSecond / BPM) * 1000 * totalBeats;
  const timePerStep = timePerSequence / totalSteps;
  // const isSynthSequencePlaying = startSynthTime !== null;
  const playerTime = useTimer(isSynthSequencePlaying);
  const lapsedTime = isSynthSequencePlaying
    ? Math.max(0, playerTime - startSynthTime)
    : 0;
  const totalLapsedTime = pastSynthLapsedTime + lapsedTime;

  useEffect(() => {
    if (isSynthSequencePlaying) {
      setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps);
    } else {
      setCurrentStep(null);
    }
  }, [isSynthSequencePlaying, timePerStep, totalLapsedTime, totalSteps]);

  const toolBarProps = {
    setSynthstartSynthTime,
    setSynthPastLapse,
    setBPM,
    isSynthSequencePlaying,
    startSynthTime,
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
          <h1 className="app_title">MEEEELOOODEEEE</h1>
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

export default Synth;
