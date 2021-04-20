import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import DraggableElement from "./DraggableElement";

import Instruments from "./Instruments";
import { togglePlayback } from "../helpers";
import { getSequence as getBass } from "../hooks/useBassStore";
import { getSequence as getDrums } from "../hooks/useDrumStore";
import { getSequence as getSynth } from "../hooks/useSynthStore";

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

  const { sessionID } = useParams();
  // console.log("SESSION ID: ", sessionID);

  const myUser = props.state.userData.find(
    (user) => user.email === props.user.email
  );
  console.log("MA USER: ", myUser);

  //get mySession.id to compare to current sessionID for save/contribute
  const mySession = props.sessionInfo.sessionData.find(
    (session) => myUser.id === session.user_id
  );
  // console.log("PROPS SESSION INFO: ", props.sessionInfo);
  // console.log("PROPS TRACK INFO: ", props.trackInfo);
  // console.log("MY SESSION: ", mySession);

  //take current session id
  //look into sessions to get current session obj
  //use current session obj's track_id to get track info from all tracks

  const currentSesssionObj = props.sessionInfo.sessionData.find(
    (session) => sessionID == session.id
  );
  // console.log("CURRENT SESH: ", currentSesssionObj);
  const currentTrack = props.trackInfo.trackData.find(
    (track) => currentSesssionObj.track_id === track.id
  );
  console.log("MY TRACK: ", currentTrack);

  const contributedTrack = {
    user_id: currentTrack.user_id,
    title: currentTrack.title,
    category: currentTrack.category,
    tags: currentTrack.tags,
    description: currentTrack.description,
    is_original: false,
  };

  const saveSession = (event) => {
    event.preventDefault();

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

  const contributeToSession = (event) => {
    event.preventDefault();

    //create new track with the same info

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
      .post(`http://localhost:5000/tracks/contribute`, {
        contributedTrack,
      })
      .then((res) => {
        console.log("SAVED CONTRIB TRACK!", res);
        axios
          .post(`http://localhost:5000/sessions/contribute`, {
            contributedSession: {
              user_id: contributedTrack.user_id,
              track_id: res.data.id,
            },
            sessionID,
          })
          .then((res) => {
            console.log("SAVED CONTRIB SESH!", res);
            const contribSessionID = res.data.id;
            axios
              .post(
                `http://localhost:5000/session/contribute/${contribSessionID}/drums`,
                {
                  drumValues,
                }
              )
              .then((res) => console.log("CONTRIB DRUMS!", res))
              .catch((err) => console.log("ERROR!", err));
            axios
              .post(
                `http://localhost:5000/session/contribute/${contribSessionID}/bass`,
                {
                  bassValues,
                }
              )
              .then((res) => console.log("CONTRIB BASS!", res))
              .catch((err) => console.log("ERROR!", err));
            axios
              .post(
                `http://localhost:5000/session/contribute/${contribSessionID}/synth`,
                {
                  synthValues,
                }
              )
              .then((res) => console.log("CONTRIB SYNTH!", res))
              .catch((err) => console.log("ERROR!", err));
          });
      })
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

  //add column to sessions table
  return (
    <div>
      <DraggableElement>
        <form-play>
          {sessionID == mySession.id ? (
            <button onClick={saveSession}>Save</button>
          ) : (
            <button onClick={contributeToSession}>Contribute</button>
          )}
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
