// Drum sounds

const drumSequenceList = [
  {
    id: 0,
    title: "Pulse",
    noteCount: 16,
    trackList: [
      {
        title: "Kick",
        soundFile: "kick",
        onNotes: [0, 4, 8, 12],
      },
      {
        title: "Snare",
        soundFile: "snare",
        onNotes: [],
      },
      {
        title: "HiHat Open",
        soundFile: "hh_open",
        onNotes: [],
      },
      {
        title: "HiHat Closed",
        soundFile: "hh_closed",
        onNotes: [],
      },
    ],
  },
];

const drumSoundFiles = {
  kick: "/sounds/drums/kick.wav",
  snare: "/sounds/drums/snare.wav",
  hh_open: "/sounds/drums/hh_open.wav",
  hh_closed: "/sounds/drums/hh_closed.wav",
};

export { drumSequenceList, drumSoundFiles };
