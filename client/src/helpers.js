import { toast } from "react-toastify";

function togglePlayback(
  isInstrumentSequencePlaying,
  setInstrumentPastLapse,
  startInstrumentTime,
  setStartInstrumentTime
) {
  if (isInstrumentSequencePlaying) {
    setInstrumentPastLapse((l) => l + performance.now() - startInstrumentTime);
    setStartInstrumentTime(null);
  } else {
    setStartInstrumentTime(performance.now());
  }
}

const notifyError = (message) =>
  toast.dark(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const notifySuccess = (message) =>
  toast.success(message, {
    hideProgressBar: true,
  });

export { togglePlayback, notifySuccess, notifyError };
