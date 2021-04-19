import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {
  const [state, setState] = useState({ userData: [] });

  useEffect(() => {
    axios
      .get(`/users`)
      .then((result) =>
        setState((prev) => ({ ...prev, userData: result.data }))
      )
      .catch((err) => console.log("ERROR!", err));
  }, []);

  return {
    state,
    setState,
  };
};

export default useUserData;
