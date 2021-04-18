import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import DraggableElement from "./DraggableElement";

import Instruments from "./Instruments";
import { togglePlayback } from "../helpers";
import { getSequence as getBass } from "../hooks/useBassStore";
import { getSequence as getDrums } from "../hooks/useDrumStore";
import { getSequence as getSynth } from "../hooks/useSynthStore";
import { TextField } from '@material-ui/core';


const Session = (props) => {
  const [startBassTime, setStartBassTime] = useState(null);
  const [pastBassLapsedTime, setBassPastLapse] = useState(0);
  const isBassSequencePlaying = startBassTime !== null;

  const [startDrumTime, setStartDrumTime] = useState(null);
  const [pastDrumLapsedTime, setDrumPastLapse] = useState(0);
  const isDrumSequencePlaying = startDrumTime !== null;

  const [startSynthTime, setStartSynthTime] = useState(null);
  const [pastSynthLapsedTime, setSynthPastLapse] = useState(0);
  const isSynthSequencePlaying = startSynthTime !== null;
  const saveSession = (event) => {
    event.preventDefault();

    const sessionID = props.match.params.sessionID;

    const drumValues = {
      drums_kick: getDrums().trackList["0"].onNotes,
      drums_snare: getDrums().trackList["1"].onNotes,
      drums_ho: getDrums().trackList["2"].onNotes,
      drums_hc: getDrums().trackList["3"].onNotes,
    };

    const bassValues = {
      bass_c2: getBass().trackList["0"].onNotes,
      bass_b1: getBass().trackList["1"].onNotes,
      bass_a1: getBass().trackList["2"].onNotes,
      bass_g1: getBass().trackList["3"].onNotes,
      bass_f1: getBass().trackList["4"].onNotes,
      bass_e1: getBass().trackList["5"].onNotes,
      bass_d1: getBass().trackList["6"].onNotes,
      bass_c1: getBass().trackList["7"].onNotes,
    };

    const synthValues = {
      synth_c4: getSynth().trackList["0"].onNotes,
      synth_b3: getSynth().trackList["1"].onNotes,
      synth_a3: getSynth().trackList["2"].onNotes,
      synth_g3: getSynth().trackList["3"].onNotes,
      synth_f3: getSynth().trackList["4"].onNotes,
      synth_e3: getSynth().trackList["5"].onNotes,
      synth_d3: getSynth().trackList["6"].onNotes,
      synth_c3: getSynth().trackList["7"].onNotes,
    };

    axios
      .post(`http://localhost:5000/session/${sessionID}/drums`, { drumValues })
      .then((res) => console.log("SAVED!", res))
      .catch((err) => console.log("ERROR!", err));
    axios
      .post(`http://localhost:5000/session/${sessionID}/bass`, { bassValues })
      .then((res) => console.log("SAVED!", res))
      .catch((err) => console.log("ERROR!", err));
    axios
      .post(`http://localhost:5000/session/${sessionID}/synth`, { synthValues })
      .then((res) => console.log("SAVED!", res))
      .catch((err) => console.log("ERROR!", err));
  };

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
      <DraggableElement>
        <form-play>
          <button onClick={saveSession}>Save</button>
          <button onClick={globalStopPlayback}>Stop!</button>
          <button onClick={globalPlayback}>Play!</button>

        </form-play>


      </DraggableElement>


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
