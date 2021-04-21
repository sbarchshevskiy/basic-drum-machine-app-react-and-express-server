import React from "react";
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import Login from "../Login";
import Styling from "./Styling";
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
      {/* <Styling></Styling> */}

      <nav className="navbar">
    
        <NavLink exact to="/" classname="main-nav" activeClassName="main-nav-active"> Home </NavLink>
        <NavLink exact to="/tracks" classname="main-nav" activeClassName="main-nav-active"> Tracks </NavLink>
        <NavLink exact to="/tracks/new" classname="main-nav" activeClassName="main-nav-active"> New Track </NavLink>
        <NavLink exact to="/collaborations" classname="main-nav" activeClassName="main-nav-active"> Collaborations </NavLink>



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
