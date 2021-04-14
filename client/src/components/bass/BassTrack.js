import React, { useState, memo } from "react";
import useSound from "../../hooks/useSound";
import Note from "./BassNote";
import "./BassTrack.css";

const Track = ({
  trackID,
  currentStepID,
  title,
  noteCount,
  onNotes,
  soundFilePath,
  saveTrackList,
}) => {
  const [play] = useSound(soundFilePath);

  const notes = [...Array(noteCount)].map((el, i) => {
    const isNoteOn = onNotes.indexOf(i) !== -1;
    const isNoteOnCurrentStep = currentStepID === i;
    const stepID = i;
    return (
      <Note
        key={i}
        trackID={trackID}
        stepID={stepID}
        isNoteOn={isNoteOn}
        isNoteOnCurrentStep={isNoteOnCurrentStep}
        play={play}
      />
    );
  });

  return (
    <div className="track">
      <button
        className="bassSaveTrackList"
        onClick={() => saveTrackList(onNotes, trackID)}
      >
        Save Tracks
      </button>
      <header className="track_title">{title}</header>
      <main className="track_notes">{notes}</main>
    </div>
  );
};

export default memo(Track);
