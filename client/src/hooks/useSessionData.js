import { useState, useEffect } from "react";
import axios from "axios";

const useSessionData = () => {
  const [sessionInfo, setSessionInfo] = useState({ sessionData: [] });

  useEffect(() => {
    axios
      .get(`/sessions`)
      .then((result) =>
        setSessionInfo((prev) => ({ ...prev, sessionData: result.data }))
      )
      .catch((err) => console.log("ERROR!", err));
  }, [sessionInfo.sessionData.length]);

  return {
    sessionInfo,
    setSessionInfo,
  };
};

export default useSessionData;