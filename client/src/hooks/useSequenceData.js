import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const useSequenceData = () => {
  const [trackID, setTrackID] = useState(null);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/sessions/${id}`);
  };

  const [state, setState] = useState({
    bassData: bassDataArr,
    synthData: synthDataArr,
    drumsData: drumsDataArr,
  });

  const setBassData = (bassData) => setState({ ...state, bassData });
  const setSynthData = (synthData) => setState({ ...state, synthData });
  const setDrumsData = (drumsData) => setState({ ...state, drumsData });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tracks/${trackID}`)
      .then((res) => {
        // console.log("SEQUENCE DONE!", res);
        const sessionID = res.data[0].id;

        handleClick(sessionID);

        axios
          .get(`http://localhost:5000/sessions/${sessionID}`)
          .then((res) => {
            // console.table(res.data[0]);

            bassDataArr[0][0].trackList.map((track, index) => {
              bassDataArr[0][0].trackList[index].onNotes =
                res.data[0][track.soundFile.toLocaleLowerCase()];
            });
            setBassData(bassDataArr);

            synthDataArr[0][0].trackList.map((track, index) => {
              synthDataArr[0][0].trackList[index].onNotes =
                res.data[0][track.soundFile.toLocaleLowerCase()];
            });
            setSynthData(synthDataArr);

            drumsDataArr[0][0].trackList.map((track, index) => {
              drumsDataArr[0][0].trackList[index].onNotes =
                res.data[0][track.soundFile.toLocaleLowerCase()];
            });
            setDrumsData(drumsDataArr);
          })
          .catch((err) => console.log("ERROR!", err));
      })
      .catch((err) => console.log("ERROR!", err));
  }, [trackID]);

  return { trackID, setTrackID, state };
};

export default useSequenceData;

let bassDataArr = [
  [
    {
      id: 0,
      title: "Pulse",
      noteCount: 16,
      trackList: [
        {
          title: "C2",
          soundFile: "bass_C2",
          onNotes: [],
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
  ],
];

let synthDataArr = [
  [
    {
      id: 0,
      title: "Pulse",
      noteCount: 16,
      trackList: [
        {
          title: "C4",
          soundFile: "synth_C4",
          onNotes: [],
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
  ],
];

let drumsDataArr = [
  [
    {
      id: 0,
      title: "Pulse",
      noteCount: 16,
      trackList: [
        {
          title: "Kick",
          soundFile: "drums_kick",
          onNotes: [],
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
  ],
];
