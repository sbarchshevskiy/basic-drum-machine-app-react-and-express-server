import React from "react";
import useTrackListData from "../hooks/useTrackListData";
import useSequenceData from "../hooks/useSequenceData";
import Track from "./Track";

import "./TrackList.css";

const TrackList = () => {
  const { state } = useTrackListData();
  const { trackID, setTrackID } = useSequenceData();

  console.log("TL STATE: ", trackID);

  const allTracks = state.trackListData.map((track, index) => (
    <div key={index} onClick={() => setTrackID(track.id)}>
      <Track
        trackID={track.id}
        name={track.name}
        title={track.title}
        category={track.category}
        description={track.description}
      />
    </div>
  ));
  return (
    <div>
      <div>{allTracks}</div>
    </div>
  );
};

export default TrackList;
