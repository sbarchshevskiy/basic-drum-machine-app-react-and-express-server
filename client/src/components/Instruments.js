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
  setStartSynthTime,
  pastSynthLapsedTime,
  setSynthPastLapse,
  isSynthSequencePlaying,
  saveTrackList,
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
          saveTrackList={saveTrackList}
        />
      </div>
      <div className="synth">
        <Synth
          startSynthTime={startSynthTime}
          setStartSynthTime={setStartSynthTime}
          pastSynthLapsedTime={pastSynthLapsedTime}
          setSynthPastLapse={setSynthPastLapse}
          isSynthSequencePlaying={isSynthSequencePlaying}
        />
      </div>
    </div>
  );
};

export default Instruments;
