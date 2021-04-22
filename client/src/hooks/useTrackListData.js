import { useState, useEffect } from "react";
import axios from "axios";

import authHeader from "../services/auth-header";

const useTrackListData = () => {
  const [state, setState] = useState({ trackListData: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tracks/", { headers: authHeader() })
      .then((result) =>
        setState((prev) => ({ ...prev, trackListData: result.data }))
      )
      .catch((err) => console.log("ERROR!", err));
  }, []);

  return {
    state,
    setState,
  };
};

export default useTrackListData;
