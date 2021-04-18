import React, { useState, useEffect, Component } from "react";
import Bass from "./bass/Bass";
import Drums from "./drums/Drums";
import Synth from "./synth/Synth";
import DraggableElement from "./DraggableElement";

const Instruments = ({
  startBassTime,
  setStartBassTime,
  pastBassLapsedTime,
  setBassPastLapse,
  isBassSequencePlaying,
  startDrumTime,
  setStartDrumTime,
  pastDrumLapsedTime,
  setDrumPastLapse,
  isDrumSequencePlaying,
  startSynthTime,
  setStartSynthTime,
  pastSynthLapsedTime,
  setSynthPastLapse,
  isSynthSequencePlaying,
}) => {
  return (

    <div>
      <div className="container">
        <DraggableElement>
          <form>
          <div className="drums">
            <Drums
              startDrumTime={startDrumTime}
              setStartDrumTime={setStartDrumTime}
              pastDrumLapsedTime={pastDrumLapsedTime}
              setDrumPastLapse={setDrumPastLapse}
              isDrumSequencePlaying={isDrumSequencePlaying}
            />
          </div>
          </form>

        </DraggableElement>

      <DraggableElement>

        <form>
          <div className="bass">
            <Bass
              startBassTime={startBassTime}
              setStartBassTime={setStartBassTime}
              pastBassLapsedTime={pastBassLapsedTime}
              setBassPastLapse={setBassPastLapse}
              isBassSequencePlaying={isBassSequencePlaying}
            />
          </div>
        </form>

      </DraggableElement>
        <DraggableElement>

          <form>
          <div className="synth">
            <Synth
              startSynthTime={startSynthTime}
              setStartSynthTime={setStartSynthTime}
              pastSynthLapsedTime={pastSynthLapsedTime}
              setSynthPastLapse={setSynthPastLapse}
              isSynthSequencePlaying={isSynthSequencePlaying}
            />
          </div>
        </form>

      </DraggableElement>


      </div>

    </div>
  );
};

export default Instruments;
