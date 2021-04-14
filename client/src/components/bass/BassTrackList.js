import React, { useContext, memo } from "react";

import { Context } from "../../hooks/useBassStore";
import { bassSoundFiles } from "../../constants/configBass";
import Track from "./BassTrack";

const TrackList = ({ currentStepID, saveTrackList }) => {
  const {
    sequence: { trackList, noteCount },
  } = useContext(Context);
  const content = trackList.map((track, trackID) => {
    const { title, onNotes, soundFile } = track;
    // props.onSave
    const soundFilePath = bassSoundFiles[soundFile];
    return (
      <Track
        key={title}
        trackID={+trackID}
        currentStepID={currentStepID}
        title={title}
        noteCount={noteCount}
        onNotes={onNotes}
        soundFilePath={soundFilePath}
        saveTrackList={saveTrackList}
      />
    );
  });

  return <div className="track-list">{content}</div>;
};

export default memo(TrackList);
