import React from "react";
import useTrackListData from "../hooks/useTrackListData";
import Track from "./Track";

import "./TrackList.css";

const TrackList = () => {
  const { state } = useTrackListData();
  console.log("STATE: ", state);
  const allTracks = state.trackListData.map((track) => (
    <div>
      <Track
        key={track.id}
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
