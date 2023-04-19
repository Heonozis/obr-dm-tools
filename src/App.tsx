import { useEffect, useState } from "react";

import OBR from "@owlbear-rodeo/sdk";
import { Header } from "./components/Header";
import { Body } from "./components/Body";

export function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [playerRole, setPlayerRole] = useState('');

  useEffect(() => {
    OBR.scene.isReady().then(setSceneReady);
    OBR.player.getRole().then(setPlayerRole);
    return OBR.scene.onReadyChange(setSceneReady);
  }, []);

  useEffect(() => {
    OBR.player.getRole().then(setPlayerRole);
  }, [sceneReady])

  if (sceneReady) {
    return playerRole === 'GM' && <Body /> || (
      <Header subtitle="Only Dungeon Master ca use this tool" />
    );
  } else {
    // Show a basic header when the scene isn't ready
    return (
      <Header subtitle="Open a scene to use the initiative tracker" />
    );
  }
}
