import React from "react";
import useTrackListData from "../hooks/useTrackListData";
import Track from "./Track";

import "./TrackList.css";

const TrackList = () => {
  const { state } = useTrackListData();
  const allTracks = state.trackListData.map((track) => (
    <div>
      <Track
        key={track.id}
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
