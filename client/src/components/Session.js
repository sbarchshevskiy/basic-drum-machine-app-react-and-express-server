import React, { useState, useEffect, Component } from "react";
import Instruments from "./Instruments";

const Session = () => {
  return (
    <div>
      <button>Save</button>
      <Instruments />
    </div>
  );
};

export default Session;
