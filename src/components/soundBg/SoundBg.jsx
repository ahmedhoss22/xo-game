// SoundBg.js
import React, { useEffect, useState } from "react";
import bgSound from "../../assets/sound/bg1.mp3";
import useSound from "use-sound";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";

const SoundBg = () => {
  const [playBg, { stop }] = useSound(bgSound, { volume: 0.05, loop: true });
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    if (isSoundOn) {
      stop();
    } else {
      playBg();
    }
    setIsSoundOn(!isSoundOn);
  };

  useEffect(() => {
    if (isSoundOn) {
      playBg();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [playBg, stop, isSoundOn]);

  return (
    <div>
      <button onClick={toggleSound}>
        {isSoundOn ? <GiSoundOn  style={{fontSize:"35px"}} /> : <GiSoundOff  style={{fontSize:"35px"}}/>}
      </button>
    </div>
  );
};

export default SoundBg;
