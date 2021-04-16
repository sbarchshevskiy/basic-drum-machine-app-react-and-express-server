import React from "react";
import { Link } from "react-router-dom";

import "./Track.css";

const Track = (props) => {
  return (
    <div className="single-track">
      <div className="track-title">Artist: {props.name}</div>
      <div className="track-title">Title: {props.title}</div>
      <div className="track-category">Category: {props.category}</div>
      <div className="track-description">Description: {props.description}</div>
    </div>
  );
};

export default Track;
