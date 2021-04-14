// Synth sounds
const synthSequenceList = [
  {
    id: 0,
    title: "Pulse",
    noteCount: 16,
    trackList: [
      {
        title: "C2",
        soundFile: "synth_C2",
        onNotes: [0, 4, 8, 12],
      },
      {
        title: "B1",
        soundFile: "synth_B1",
        onNotes: [],
      },
      {
        title: "A1",
        soundFile: "synth_A1",
        onNotes: [],
      },
      {
        title: "G1",
        soundFile: "synth_G1",
        onNotes: [],
      },
      {
        title: "F1",
        soundFile: "synth_F1",
        onNotes: [],
      },
      {
        title: "E1",
        soundFile: "synth_E1",
        onNotes: [],
      },
      {
        title: "D1",
        soundFile: "synth_D1",
        onNotes: [],
      },
      {
        title: "C1",
        soundFile: "synth_C1",
        onNotes: [],
      },
    ],
  },
];

const synthSoundFiles = {
  synth_C2: "/sounds/synth/synth_C2.wav",
  synth_B1: "/sounds/synth/synth_B1.wav",
  synth_A1: "/sounds/synth/synth_A1.wav",
  synth_G1: "/sounds/synth/synth_G1.wav",
  synth_F1: "/sounds/synth/synth_F1.wav",
  synth_E1: "/sounds/synth/synth_E1.wav",
  synth_D1: "/sounds/synth/synth_D1.wav",
  synth_C1: "/sounds/synth/synth_C1.wav",
};

export { synthSequenceList, synthSoundFiles };
