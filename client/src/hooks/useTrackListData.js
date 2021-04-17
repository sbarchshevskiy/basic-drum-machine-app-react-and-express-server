import { useState, useEffect } from "react";
import axios from "axios";

const useTrackListData = () => {
  const [state, setState] = useState({ trackListData: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/tracks/")
      .then((result) =>
        setState((prev) => ({ ...prev, trackListData: result.data }))
      )
      .catch((err) => console.log("ERROR!", err));
  }, []);

  console.log("TRACK STATE: ", state.trackListData);

  return {
    state,
    setState,
  };
};

export default useTrackListData;
