import React, { useState, useEffect, Component } from "react";
import Instruments from "./Instruments";
// import globalTogglePlayback from "../helpers/globalTogglePlayback";

const Session = () => {
  return (
    <div>
      <button>Play!</button>
      <Instruments />
    </div>
  );
};

export default Session;
