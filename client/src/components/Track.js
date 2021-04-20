import React from "react";
import { useHistory } from "react-router-dom";
// import useSequenceData from "../hooks/useSequenceData";
import "./Track.css";

const Track = (props) => {
  const history = useHistory();

  // const { trackID, setTrackID } = useSequenceData();

  return (
    <div className="single-track" style={{ cursor: "pointer" }}>
      <div className="track-artist">Artist: {props.name}</div>
      <div className="track-title">Title: {props.title}</div>
      <div className="track-category">Category: {props.category}</div>
      <div className="track-description">Description: {props.description}</div>
    </div>
  );
};

export default Track;
