import React, { useContext, memo } from "react";

import { togglePlayback as toggleBassPlayback } from "../components/bass/Toolbar";
import { togglePlayback as toggleDrumPlayback } from "../components/drums/DrumsToolbar";
import { togglePlayback as toggleSynthPlayback } from "../components/synth/SynthToolbar";

export default function globalTogglePlayback() {
  toggleBassPlayback();
  toggleDrumPlayback();
  toggleSynthPlayback();
}
