import React from "react";
import { NavLink } from "react-router-dom";
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
    
        <NavLink exact to="/" classname="main-nav" activeClassName="main-nav-active"> Home </NavLink>
        <NavLink exact to="tracks" classname="main-nav" activeClassName="main-nav-active"> Tracks </NavLink>
        <NavLink exact to="/tracks/new" classname="main-nav" activeClassName="main-nav-active"> New Track </NavLink>


        <NavLink exact to="/#" classname="main-nav" activeClassName="main-nav-active" onClick={user ? handleLogout : onLoginClick}>
          {user ? "Logout" : "Login"}
        </NavLink>

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
