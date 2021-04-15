// Synth sounds
const synthSequenceList = [
  {
    id: 0,
    title: "Pulse",
    noteCount: 16,
    trackList: [
      {
        title: "C4",
        soundFile: "synth_C4",
        onNotes: [0, 4, 8, 12],
      },
      {
        title: "B3",
        soundFile: "synth_B3",
        onNotes: [],
      },
      {
        title: "A3",
        soundFile: "synth_A3",
        onNotes: [],
      },
      {
        title: "G3",
        soundFile: "synth_G3",
        onNotes: [],
      },
      {
        title: "F3",
        soundFile: "synth_F3",
        onNotes: [],
      },
      {
        title: "E3",
        soundFile: "synth_E3",
        onNotes: [],
      },
      {
        title: "D3",
        soundFile: "synth_D3",
        onNotes: [],
      },
      {
        title: "C3",
        soundFile: "synth_C3",
        onNotes: [],
      },
    ],
  },
];

const synthSoundFiles = {
  synth_C4: "/sounds/synth/synth_C4.wav",
  synth_B3: "/sounds/synth/synth_B3.wav",
  synth_A3: "/sounds/synth/synth_A3.wav",
  synth_G3: "/sounds/synth/synth_G3.wav",
  synth_F3: "/sounds/synth/synth_F3.wav",
  synth_E3: "/sounds/synth/synth_E3.wav",
  synth_D3: "/sounds/synth/synth_D3.wav",
  synth_C3: "/sounds/synth/synth_C3.wav",
};

export { synthSequenceList, synthSoundFiles };
