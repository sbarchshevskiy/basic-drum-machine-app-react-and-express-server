import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login";

import "./Nav.css";

const Nav = ({
  user,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleLogout,
  handleSignup,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
  showLogin,
  setShowLogin,
}) => {
  const onLoginClick = () => {
    setShowLogin(true);
  };
  console.log("SHOW LOGIN: ", showLogin);
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">Orca</div>
        <Link to="/">Home</Link>
        <Link to="/tracks">Tracks</Link>
        <Link to="/tracks/new">New Track</Link>
        <Link to="/collaborations">Collaborations</Link>
        <Link to="#" onClick={user ? handleLogout : onLoginClick}>
          {user ? "Logout" : "Login"}
        </Link>
      </nav>
      {showLogin ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      ) : null}
    </div>
  );
};

export default Nav;
