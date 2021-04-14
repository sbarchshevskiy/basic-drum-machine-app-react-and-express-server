import React, { useState, useEffect, Component } from "react";
import Instruments from "./Instruments";
// import globalTogglePlayback from "../helpers/globalTogglePlayback";

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

  return (
    <div>
      <button>Play!</button>
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
