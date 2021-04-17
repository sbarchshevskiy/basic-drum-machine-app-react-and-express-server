import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "./Track.css";

const Track = (props) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/sessions/${id}`);
  };

  const getSession = (trackID) => {
    axios
      .get(`http://localhost:5000/tracks/${trackID}`)
      .then((res) => {
        console.log("DONE!", res.data);
        const sessionID = res.data[0].id;

        handleClick(sessionID);

        axios
          .get(`http://localhost:5000/sessions/${sessionID}`)
          .then((res) => console.log("FETCHED!", res.data[0]))
          .catch((err) => console.log("ERROR!", err));
      })
      .catch((err) => console.log("ERROR!", err));
  };
  return (
    <div className="single-track">
      <a href="#">
        <div onClick={() => getSession(props.trackID)}>
          Artist: {props.name}
        </div>
      </a>
      <div className="track-title">Title: {props.title}</div>
      <div className="track-category">Category: {props.category}</div>
      <div className="track-description">Description: {props.description}</div>
    </div>
  );
};

export default Track;
