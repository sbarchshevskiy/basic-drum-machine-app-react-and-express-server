import React, { useContext, useEffect, memo } from "react";
import classNames from "classnames";
import { Context } from "../../hooks/useBassStore";
import "./BassNote.css";

const Note = ({ trackID, stepID, isNoteOn, isNoteOnCurrentStep, play }) => {

  const { toggleNote } = useContext(Context);
  const noteClassNames = classNames("note", {
    on: isNoteOn,
    playing: isNoteOn && isNoteOnCurrentStep,
  });

  useEffect(() => {
    if (isNoteOn && isNoteOnCurrentStep) {
      play();
    }
  }, [isNoteOn, isNoteOnCurrentStep, play]);
  console.log('is note on current (bass) ',isNoteOnCurrentStep);
  // track ID = column

  const noteClicked = (e) => {
    e.target.classList.toggle("on");
    toggleNote({ trackID, stepID });
    console.log('trackID: ',trackID);
    console.log('stepID', stepID);
    play();
  };

  return <div className={noteClassNames} onClick={noteClicked} />;
};

export default memo(Note);
