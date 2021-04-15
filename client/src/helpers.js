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

export { togglePlayback };
