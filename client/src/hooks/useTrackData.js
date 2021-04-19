import { useState, useEffect } from "react";
import axios from "axios";

const useTrackData = () => {
  const [trackInfo, setTrackInfo] = useState({ trackData: [] });

  useEffect(() => {
    axios
      .get(`/tracks/all`)
      .then((result) =>
        setTrackInfo((prev) => ({ ...prev, trackData: result.data }))
      )
      .catch((err) => console.log("ERROR!", err));
  }, []);

  return {
    trackInfo,
    setTrackInfo,
  };
};

export default useTrackData;
