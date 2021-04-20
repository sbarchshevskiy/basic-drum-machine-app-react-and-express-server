import React from "react";
import useTrackListData from "../hooks/useTrackListData";
import useSequenceData from "../hooks/useSequenceData";
import Track from "./Track";
import "./TrackList.css";
import axios from "axios";

const ContribTrackList = ({ userData }) => {
  const { state } = useTrackListData();
  const { setTrackID } = useSequenceData();
  console.log("CONTIRB USER: ", userData);

  const handleReject = (trackID) => {
    axios
      .delete(`http://localhost:5000/tracks/${trackID}`, { trackID })
      .then((res) => {
        console.log("DELETE RES: ", res);
      });
  };
  console.log("STATE: ", state);
  // const handleAccept = ()
  //using track id find the session id
  //using session id find sequences in db
  //

  const allTracks = state.trackListData
    .filter((track) => !track.is_original && track.user_id === userData.id)
    .map((track, index) => (
      <div>
        <div key={index} onClick={() => setTrackID(track.id)}>
          <Track
            trackID={track.id}
            name={track.name}
            title={track.title}
            category={track.category}
            description={track.description}
            isOriginal={track.is_original}
          />
        </div>
        <button>accept</button>
        <button onClick={() => handleReject(track.id)}>reject</button>
      </div>
    ));
  return (
    <div>
      <div>{allTracks}</div>
    </div>
  );
};

export default ContribTrackList;
