import React, { useState, useEffect, Component } from "react";
import Instruments from "./Instruments";
import { togglePlayback } from "../helpers";

const Session = () => {
  const [startBassTime, setStartBassTime] = useState(null);
  const [pastBassLapsedTime, setBassPastLapse] = useState(0);
  const isBassSequencePlaying = startBassTime !== null;

  const [startDrumTime, setStartDrumTime] = useState(null);
  const [pastDrumLapsedTime, setDrumPastLapse] = useState(0);
  const isDrumSequencePlaying = startDrumTime !== null;

  const [startSynthTime, setStartSynthTime] = useState(null);
  const [pastSynthLapsedTime, setSynthPastLapse] = useState(0);
  const isSynthSequencePlaying = startSynthTime !== null;

  function drumsPlayback() {
    togglePlayback(
      isDrumSequencePlaying,
      setDrumPastLapse,
      startDrumTime,
      setStartDrumTime
    );
  }

  function bassPlayback() {
    togglePlayback(
      isBassSequencePlaying,
      setBassPastLapse,
      startBassTime,
      setStartBassTime
    );
  }

  function synthPlayback() {
    togglePlayback(
      isSynthSequencePlaying,
      setSynthPastLapse,
      startSynthTime,
      setStartSynthTime
    );
  }

  function globalPlayback() {
    drumsPlayback();
    bassPlayback();
    synthPlayback();
  }

  function stopDrumPlayback() {
    setDrumPastLapse(0);
    setStartDrumTime(null);
  }

  function stopBassPlayback() {
    setBassPastLapse(0);
    setStartBassTime(null);
  }

  function stopSynthPlayback() {
    setSynthPastLapse(0);
    setStartSynthTime(null);
  }

  function globalStopPlayback() {
    stopDrumPlayback();
    stopBassPlayback();
    stopSynthPlayback();
  }

  return (
    <div>
      <button>Save</button>
      <button onClick={globalStopPlayback}>Stop!</button>
      <button onClick={globalPlayback}>Play!</button>
      <Instruments
        startBassTime={startBassTime}
        setStartBassTime={setStartBassTime}
        pastBassLapsedTime={pastBassLapsedTime}
        setBassPastLapse={setBassPastLapse}
        isBassSequencePlaying={isBassSequencePlaying}
        startDrumTime={startDrumTime}
        setStartDrumTime={setStartDrumTime}
        pastDrumLapsedTime={pastDrumLapsedTime}
        setDrumPastLapse={setDrumPastLapse}
        isDrumSequencePlaying={isDrumSequencePlaying}
        startSynthTime={startSynthTime}
        setStartSynthTime={setStartSynthTime}
        pastSynthLapsedTime={pastSynthLapsedTime}
        setSynthPastLapse={setSynthPastLapse}
        isSynthSequencePlaying={isSynthSequencePlaying}
      />
    </div>
  );
};

export default Session;
