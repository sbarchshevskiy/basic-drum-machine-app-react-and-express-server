import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Track.css";

const TrackList = () => {
  axios
    .get("http://localhost:5000/tracks/")
    .then((res) => console.log("SAVED!", res.data))
    .catch((err) => console.log("ERROR!", err));

  return (
    <nav className="navbar">
      <div className="navbar-title">Orca</div>
      <Link to="/">Home</Link>
      <Link to="/track">Tracks</Link>
      <Link to="/tracks/new">New Track</Link>
    </nav>
  );
};

export default TrackList;
