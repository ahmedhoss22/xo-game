// SoundBg.js
// SoundBg.js
import { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { toggleSound } from "@/redux/slices/soundSlice";
import useSound from "use-sound";
import bgSound from "@/assets/sound/bg1.mp3";

const SoundBg = () => {
  const dispatch = useDispatch();
 
  
  const isSoundOn = useSelector((state) => state.soundSlice.isSoundOn);
  const [playBg, { stop }] = useSound(bgSound, { volume: 0.05, loop: true });
 
  
  
  const handleToggleSound = () => {
    dispatch(toggleSound(!isSoundOn));
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
 
  }, [isSoundOn, playBg, stop]);

  return (
    <div>
      <button onClick={handleToggleSound}>
        {isSoundOn ? (
          <GiSoundOn style={{ fontSize: "35px" }} />
        ) : (
          <GiSoundOff style={{ fontSize: "35px" }} />
        )}
      </button>
    </div>
  );
};

export default SoundBg;
