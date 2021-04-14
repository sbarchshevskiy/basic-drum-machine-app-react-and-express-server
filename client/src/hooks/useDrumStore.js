import React, { useReducer, createContext } from "react";
import { drumSequenceList } from "../constants/configDrums";

const Context = createContext({
  sequence: {},
  toggleNote: () => {},
  selectSequence: () => {},
});

let trackSequence = {
  ...drumSequenceList[0],
};

function getSequence() {
  return trackSequence;
}

const appReducer = (state, action) => {
  let newSequence;
  switch (action.type) {
    case "SET_SEQUENCE":
      newSequence = {
        ...drumSequenceList.find((seq) => seq.id === action.value),
      };
      trackSequence = newSequence;
      return newSequence;

    case "SET_ON_NOTES":
      let newTrackList = state.trackList.map((track, trackID) => {
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
        ...state,
        trackList: newTrackList,
      };

      trackSequence = newSequence;

      return newSequence;
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [sequence, dispatch] = useReducer(appReducer, {
    ...drumSequenceList[0],
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

  const selectSequence = (sequenceID) => {
    dispatch({
      type: "SET_SEQUENCE",
      value: sequenceID,
    });
  };

  return (
    <Context.Provider value={{ sequence, toggleNote, selectSequence }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context, getSequence };
