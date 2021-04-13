import React, {useState} from 'react';
const actx = new AudioContext();
const out = actx.destination

const mainGainNode = actx.createGain();
mainGainNode.gain.setValueAtTime(1, 0);
mainGainNode.connect(out);

const notes = [
  { name: "C", frequency: 49 },
  { name: "C#", frequency: 52 },
  { name: "D", frequency: 55 },
  { name: "D#", frequency: 58 },
  { name: "E", frequency: 61 },
  { name: "F", frequency: 64 },
  { name: "F#", frequency: 68 },
  { name: "G", frequency: 71 },
  { name: "C", frequency: 74 },
  { name: "C#", frequency: 78 },
  { name: "D", frequency: 82 },
  { name: "D#", frequency: 87 },
  { name: "E", frequency: 91 },
  { name: "F", frequency: 96 },
  { name: "F#", frequency: 101 },
  { name: "G", frequency: 107 }
];

export default function DrumModule(){
  // const [oscKick, setOscKick] = useState(osc1.frequency.value)

  const kickEvent = () => {
      const kick = actx.createOscillator();
    //hz value
    kick.frequency.setValueAtTime(107, 0);
    kick.frequency.exponentialRampToValueAtTime(
      0.001,
      actx.currentTime + 0.5
    );

    const kickGain = actx.createGain();
    kickGain.gain.setValueAtTime(1, 0);
    // will end the beat fraction of a second earlier to avoid loud speaker pop
    kickGain.gain.exponentialRampToValueAtTime(
      0.001,
      actx.currentTime + 0.5
    );

    kick.connect(kickGain);
    kickGain.connect(mainGainNode);
    kick.start();
    //stops the sound from playing in 0.5 second
    kick.stop(actx.currentTime + 0.5);
  };

  return(
    <div>
      <button onClick={() => kickEvent()}>kick</button>
    </div>
  )
}