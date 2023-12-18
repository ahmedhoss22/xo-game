'use client';
import './loading.scss';
import { GridLoader } from 'react-spinners';
import { Howl } from 'howler';  
import { useEffect } from 'react';
import useSound from 'use-sound';

const Loading = ({text}) => {
//   const audioClips = [
//     {
//       sound: '../../assets/sound/s.mp3',
//       label: 'click',
//     },
//   ];

//   const soundPlay = (src) => {
//     const sound = new Howl({
//       src,
//       html5: true,
//     });
//     sound.play();
//   };

//   useEffect(() => {
//     // Cleanup function to unload the sound on component unmount
//     return () => {
//       Howler.unload();
//     };
//   }, []);
// const [playSound] = useSound('http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3');

  return (
    <div className='loading-page'> 
      <GridLoader color="#8c0e68" />
      <h2 className='fw-bold' style={ {color:"#8c0e68"}}>{text}</h2>
      {/* <button onClick={() => soundPlay(audioClips[0].sound)}>Play Sound</button> */}
      {/* <button onClick={playSound}>Play Sound</button> */}

    </div>
  );
}

export default Loading;
