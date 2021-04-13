// Drum sounds

const soundLibrary = {
  hiHat: "https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/hatOpen.mp3",
  snare: "https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/snare.mp3",
  hatClosed: "https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/hatClosed.mp3",
};

const drumSequenceList = [
  {
    id: 0,
    title: "Pulse",
    noteCount: 16,
    trackList: [
      {
        title: "Kick",
        soundFile: "bass_C2",
        onNotes: [0, 4, 8, 12],
      },
      {
        title: "Snare",
        soundFile: "bass_B1",
        onNotes: [],
      },
      {
        title: "HiHat Open",
        soundFile: "bass_A1",
        onNotes: [],
      },
      {
        title: "HiHat Closed",
        soundFile: "bass_G1",
        onNotes: [],
      },
    ],
  },
];

const drumSoundFiles = {
  bass_C2: "/sounds/bass/bass_C2.wav",
  bass_B1: "/sounds/bass/bass_B1.wav",
  bass_A1: "/sounds/bass/bass_A1.wav",
  bass_G1: "/sounds/bass/bass_G1.wav",
  bass_F1: "/sounds/bass/bass_F1.wav",
  bass_E1: "/sounds/bass/bass_E1.wav",
  bass_D1: "/sounds/bass/bass_D1.wav",
  bass_C1: "/sounds/bass/bass_C1.wav",
};

export { drumSequenceList, drumSoundFiles };
