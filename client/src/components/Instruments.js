import React, { useState, useEffect, Component } from "react";
import Bass from "./bass/Bass";
import Drums from "./drums/Drums";
import Synth from "./synth/Synth";

const Instruments = () => {
  return (
    <div>
      <div className="drums">
        <Drums />
      </div>
      <div className="bass">
        <Bass />
      </div>
      <div className="synth">
        <Synth />
      </div>
    </div>
  );
};

export default Instruments;
