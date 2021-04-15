import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Orca</div>
      <Link to="/">Home</Link>
      <Link to="/session">Session</Link>
      <Link to="/tracks/new">New Track</Link>
    </nav>
  );
};

export default Nav;
