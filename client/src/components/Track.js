import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Track.css";

const Track = (props) => {
  const getSession = (trackID) => {
    axios
      .get("http://localhost:5000/sessions/:sessionID")
      .then((res) => console.log("DONE!", res.rows))
      .catch((err) => console.log("ERROR!", err));
  };
  return (
    <div className="single-track">
      <Link to="/sessions/:sessionID" onClick={getSession(props.key)}>
        Artist: {props.name}
      </Link>
      <div className="track-title">Title: {props.title}</div>
      <div className="track-category">Category: {props.category}</div>
      <div className="track-description">Description: {props.description}</div>
    </div>
  );
};

export default Track;
