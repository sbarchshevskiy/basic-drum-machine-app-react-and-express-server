import React, { useContext, memo } from "react";
import { Context } from "../../hooks/useSynthStore";
import { synthSoundFiles } from "../../constants/configSynth";
import Track from "./SynthTrack";

const TrackList = ({ currentStepID }) => {
  const {
    sequence: { trackList, noteCount },
  } = useContext(Context);
  const content = trackList.map((track, trackID) => {
    const { title, onNotes, soundFile } = track;
    const soundFilePath = synthSoundFiles[soundFile];

    return (
      <Track
        key={title}
        trackID={+trackID}
        currentStepID={currentStepID}
        title={title}
        noteCount={noteCount}
        onNotes={onNotes}
        soundFilePath={soundFilePath}
      />
    );
  });

  return <div className="track-list">{content}</div>;
};

export default memo(TrackList);
