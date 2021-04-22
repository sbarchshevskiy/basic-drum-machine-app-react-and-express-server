import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = (props) => {
    const { currentUser, setShowModal, logOut } = props;

  return (
    <nav className="navbar">
      <div className="navbar-title">Orca</div>
        <div className="navbar-menus">
            <Link to="/">Home</Link>
            <Link to="/tracks">Tracks</Link>
            <Link to="/tracks/new">New Track</Link>
            {currentUser && (
                <Link to="/">{currentUser.name}</Link>
            )}

            {currentUser ? (
                <a href="/" onClick={logOut}>LogOut</a>
            ) : (
                <Link to="/" onClick={setShowModal}>Login</Link>
            )}
        </div>
    </nav>
  );
};

export default Nav;
