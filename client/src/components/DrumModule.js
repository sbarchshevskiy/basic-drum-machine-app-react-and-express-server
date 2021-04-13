import React, {useState} from 'react';
const actx = new AudioContext();
const out = actx.destination

const mainGainNode = actx.createGain();
mainGainNode.gain.setValueAtTime(0.05, 0);
mainGainNode.connect(out);


export default function DrumModule(){

  // const [oscKick, setOscKick] = useState();

  const kickEvent = () => {
    const kick = actx.createOscillator();

    kick.frequency.setValueAtTime(150, 0);
    kick.frequency.exponentialRampToValueAtTime(
      0.001,
      actx.currentTime + 0.5
    );

    const kickGain = actx.createGain();
    kickGain.gain.setValueAtTime(1, 0);
    kickGain.gain.exponentialRampToValueAtTime(
      0.001,
      actx.currentTime + 0.5
    );

    kick.connect(kickGain);
    kickGain.connect(mainGainNode);
    kick.start();
    kick.stop(actx.currentTime + 0.5);
  };


  return(
    <div>
      <button onClick={() => kickEvent()}>kick</button>
    </div>
  )
}