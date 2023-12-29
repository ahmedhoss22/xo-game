
'use client'
import { useEffect } from "react";
import bgSound from "../../assets/sound/bg1.mp3";
import useSound from "use-sound";

const SoundBg = () => {
    const [playBg, { stop }] = useSound(bgSound, { volume: 0.05, loop: true });

    useEffect(() => {
      playBg();
  
      return () => {
        stop();
      };
    }, [playBg, stop]);

}

export default SoundBg
