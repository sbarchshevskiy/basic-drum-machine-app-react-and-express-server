import React, { useState, useEffect, Component } from "react";
import Bass from "./bass/Bass";
import Drums from "./drums/Drums";

const Instruments = () => {
  return (
    <div>
      <div className="drums">
        <Drums />
      </div>
      <div className="bass">
        <Bass />
      </div>
    </div>
  );
};

export default Instruments;
