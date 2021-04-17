import React, { useReducer, createContext } from "react";
import { bassSequenceList } from "../constants/configBass";
import useSequenceData from "../hooks/useSequenceData";

let bassDataObj = {};

function loadBass(bassData) {
  bassDataObj = bassData;
}

const Context = createContext({
  sequence: {},
  toggleNote: () => {},
  selectSequence: () => {},
  useSequenceData: () => {},
});

let trackSequence = {
  ...bassSequenceList[0],
};

function getSequence() {
  return trackSequence;
}

const appReducer = (stateReducer, action) => {
  console.log("REDUCER: ", stateReducer);
  let newSequence;
  switch (action.type) {
    case "SET_SEQUENCE":
      const { state } = useSequenceData();

      newSequence = {
        ...state.bassData[0][0].find((seq) => seq.id === action.value),
      };
      trackSequence = newSequence;
      return newSequence;

    case "SET_ON_NOTES":
      let newTrackList = stateReducer.trackList.map((track, trackID) => {
        if (action.trackID === trackID) {
          return {
            ...track,
            onNotes: action.value,
          };
        } else {
          return track;
        }
      });
      newSequence = {
        ...stateReducer,
        trackList: newTrackList,
      };

      trackSequence = newSequence;

      return newSequence;
    default:
      return stateReducer;
  }
};

const Provider = ({ children }) => {
  const { state } = useSequenceData();

  console.log("SEQUENCE Provider: ", state.bassData[0][0]);

  const [sequence, dispatch] = useReducer(appReducer, {
    ...state.bassData[0][0],
  });

  const toggleNote = ({ trackID, stepID }) => {
    let newOnNotes;
    const onNotes = sequence.trackList[trackID].onNotes;

    if (onNotes.indexOf(stepID) === -1) {
      newOnNotes = [...onNotes, stepID];
    } else {
      newOnNotes = onNotes.filter((col) => col !== stepID);
    }
    dispatch({
      type: "SET_ON_NOTES",
      value: newOnNotes,
      trackID,
    });
  };
  const selectSequence = (sequenceID, state) => {
    dispatch({
      type: "SET_SEQUENCE",
      value: sequenceID,
      state,
    });
  };

  return (
    <Context.Provider
      value={{
        sequence,
        toggleNote,
        selectSequence,
        useSequenceData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context, getSequence, loadBass };
