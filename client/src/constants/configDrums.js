// Drum sounds

const drumSequenceList = [
  {
    id: 0,
    title: "Pulse",
    noteCount: 16,
    trackList: [
      {
        title: "Kick",
        soundFile: "drums_kick",
        onNotes: [0, 4, 8, 12],
      },
      {
        title: "Snare",
        soundFile: "drums_snare",
        onNotes: [],
      },
      {
        title: "HiHat Open",
        soundFile: "drums_ho",
        onNotes: [],
      },
      {
        title: "HiHat Closed",
        soundFile: "drums_hc",
        onNotes: [],
      },
    ],
  },
];

const drumSoundFiles = {
  drums_kick: "/sounds/drums/kick.wav",
  drums_snare: "/sounds/drums/snare.wav",
  drums_ho: "/sounds/drums/hh_open.wav",
  drums_hc: "/sounds/drums/hh_closed.wav",
};

export { drumSequenceList, drumSoundFiles };
