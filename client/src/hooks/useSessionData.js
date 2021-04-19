import { useState, useEffect } from "react";
import axios from "axios";

const useSessionData = () => {
  const [state, setState] = useState({ sessionData: [] });

  useEffect(() => {
    axios
      .get(`/sessions`)
      .then((result) =>
        setState((prev) => ({ ...prev, sessionData: result.data }))
      )
      .catch((err) => console.log("ERROR!", err));
  }, []);

  return {
    state,
    setState,
  };
};

export default useSessionata;
