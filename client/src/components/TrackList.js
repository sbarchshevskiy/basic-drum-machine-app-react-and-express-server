import React from "react";
import useTrackListData from "../hooks/useTrackListData";

import "./Track.css";

const TrackList = () => {
  const { state } = useTrackListData();

  return (
    <div>
      <div>
        {state.trackListData.map((track) => (
          <div>{track.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
