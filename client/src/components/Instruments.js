import React, { useState, useEffect, Component } from "react";
import Bass from "./bass/Bass";
import Drums from "./drums/Drums";
import Synth from "./synth/Synth";

const Instruments = ({
  startBassTime,
  setStartBassTime,
  pastBassLapsedTime,
  setBassPastLapse,
  isBassSequencePlaying,
  startDrumTime,
  setStartDrumTime,
  pastDrumLapsedTime,
  setDrumPastLapse,
  isDrumSequencePlaying,
  startSynthTime,
  setSynthstartSynthTime,
  pastSynthLapsedTime,
  setSynthPastLapse,
  isSynthSequencePlaying,
}) => {
  return (
    <div>
      <div className="drums">
        <Drums
          startDrumTime={startDrumTime}
          setStartDrumTime={setStartDrumTime}
          pastDrumLapsedTime={pastDrumLapsedTime}
          setDrumPastLapse={setDrumPastLapse}
          isDrumSequencePlaying={isDrumSequencePlaying}
        />
      </div>
      <div className="bass">
        <Bass
          startBassTime={startBassTime}
          setStartBassTime={setStartBassTime}
          pastBassLapsedTime={pastBassLapsedTime}
          setBassPastLapse={setBassPastLapse}
          isBassSequencePlaying={isBassSequencePlaying}
        />
      </div>
      <div className="synth">
        <Synth
          startSynthTime={startSynthTime}
          setSynthstartSynthTime={setSynthstartSynthTime}
          pastSynthLapsedTime={pastSynthLapsedTime}
          setSynthPastLapse={setSynthPastLapse}
          isSynthSequencePlaying={isSynthSequencePlaying}
        />
      </div>
    </div>
  );
};

export default Instruments;
