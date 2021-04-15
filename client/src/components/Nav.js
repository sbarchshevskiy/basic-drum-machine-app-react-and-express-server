import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Orca</div>
      <Link to="/">Home</Link>
      <Link to="/session">Session</Link>
    </nav>
  );
};

export default Nav;
