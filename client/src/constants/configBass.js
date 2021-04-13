// Bass sounds
const bassSequenceList = [
  {
    id: 0,
    title: "Pulse",
    noteCount: 16,
    trackList: [
      {
        title: "C2",
        soundFile: "bass_C2",
        onNotes: [0, 4, 8, 12],
      },
      {
        title: "B1",
        soundFile: "bass_B1",
        onNotes: [],
      },
      {
        title: "A1",
        soundFile: "bass_A1",
        onNotes: [],
      },
      {
        title: "G1",
        soundFile: "bass_G1",
        onNotes: [],
      },
      {
        title: "F1",
        soundFile: "bass_F1",
        onNotes: [],
      },
      {
        title: "E1",
        soundFile: "bass_E1",
        onNotes: [],
      },
      {
        title: "D1",
        soundFile: "bass_D1",
        onNotes: [],
      },
      {
        title: "C1",
        soundFile: "bass_C1",
        onNotes: [],
      },
    ],
  },
];

const bassSoundFiles = {
  bass_C2: "/sounds/bass/bass_C2.wav",
  bass_B1: "/sounds/bass/bass_B1.wav",
  bass_A1: "/sounds/bass/bass_A1.wav",
  bass_G1: "/sounds/bass/bass_G1.wav",
  bass_F1: "/sounds/bass/bass_F1.wav",
  bass_E1: "/sounds/bass/bass_E1.wav",
  bass_D1: "/sounds/bass/bass_D1.wav",
  bass_C1: "/sounds/bass/bass_C1.wav",
};

export { bassSequenceList, bassSoundFiles };
