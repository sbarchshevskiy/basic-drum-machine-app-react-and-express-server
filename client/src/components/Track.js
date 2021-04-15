import React from "react";
import { Link } from "react-router-dom";

import "./Track.css";

const Track = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Orca</div>
      <Link to="/">Home</Link>
      <Link to="/track">Tracks</Link>
      <Link to="/tracks/new">New Track</Link>
    </nav>
  );
};

export default Track;
