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
  });
  const setBassData = (bassData) => setState({ ...state, bassData });

  useEffect(() => {
    console.log("TRACK ID: ", trackID);
    axios
      .get(`http://localhost:5000/tracks/${trackID}`)
      .then((res) => {
        console.log("DONE!", res);
        const sessionID = res.data[0].id;

        handleClick(sessionID);

        axios
          .get(`http://localhost:5000/sessions/${sessionID}`)
          .then((res) => {
            console.table(res.data[0]);
            bassDataArr[0][0].trackList.map((track, index) => {
              // console.log(
              //   "BASS INDEX: ",
              //   bassDataArr[0][0].trackList[index].onNotes,
              //   index
              // );
              // console.log("SOUNDFILE: ", track.soundFile.toLocaleLowerCase());
              // console.log(
              //   "RES.SOUNDFILE: ",
              //   res.data[0][track.soundFile.toLocaleLowerCase()]
              // );
              bassDataArr[0][0].trackList[index].onNotes =
                res.data[0][track.soundFile.toLocaleLowerCase()];
              // console.log(
              //   "LINE 46: ",
              //   res.data[0][track.soundFile.toLocaleLowerCase()]
              // );
            });
            setBassData(bassDataArr);
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
