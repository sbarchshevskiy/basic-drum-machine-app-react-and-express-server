import React, { useState, useEffect, Component } from "react";
import Bass from "./bass/Bass";
import Drums from "./drums/Drums";
import Synth from "./synth/Synth";
import DraggableElement from "./DraggableElement";
import Styling from './Styling'

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

  const [showDrums, setShowDrums] = useState(false);
  const [showBass, setShowBass] = useState(false);
  const [showSynth, setShowSynth] = useState(false);

  return (
   


    <div>
      <div className="container">
          {
          showDrums? <DraggableElement>
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
        </DraggableElement> : <span></span>
        }  
        {
          showBass?<DraggableElement>
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
  
        </DraggableElement> : <span></span>
        }

        {
          showSynth?<DraggableElement>
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
        </DraggableElement> : <span></span>
        }
        <DraggableElement>
          <form-play>

          <button onClick={() => setShowDrums(!showDrums)}>Drums</button>
        <button onClick={() => setShowBass(!showBass)}>Bass</button>
        <button onClick={() => setShowSynth(!showSynth)}>Synth</button>
        </form-play>
        
        </DraggableElement>
      </div>
    </div>

  );
};

export default Instruments;
