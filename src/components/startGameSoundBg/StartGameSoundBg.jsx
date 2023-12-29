import { useEffect } from "react";
import useSound from "use-sound";
import startGame from "../../assets/sound/startGame.mp3";

const StartGameSoundBg = () => {
  const [startGameSound, { stop }] = useSound(startGame, { volume: 0.05 });

  useEffect(() => {
    // Play the start game sound when the component is mounted
    startGameSound();

    // Stop the sound after 9 seconds
    const duration = 9000;
    const timeoutId = setTimeout(() => {
      stop();
    }, duration);

 
  }, [startGameSound ,stop]); // Empty dependency array means this useEffect runs only once on mount

  // You might want to return some JSX here, or leave it empty if this is just for the sound

  return null;
};

export default StartGameSoundBg;
