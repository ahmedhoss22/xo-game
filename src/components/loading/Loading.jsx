'use client';
import './loading.scss';
import { GridLoader } from 'react-spinners';
import { Howl } from 'howler';  
import { useEffect } from 'react';
import useSound from 'use-sound'; 
import localFont from 'next/font/local';


const myFont = localFont({ src: '../../assets/fonts/Pacifico-Regular.ttf' });

const Loading = ({text , backGround}) => {
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
    <div className='loading-page' > 
    <div  style={ {zIndex: '100'}}>
             <GridLoader color="#8c0e68" />

    </div>
    <div style={ {color:"#8c0e68" , zIndex: '100'}}>    <div style={myFont.style  } >
      <h1 className='fw-bold'>{text}</h1>

    </div>

    </div>

      {/* <button onClick={() => soundPlay(audioClips[0].sound)}>Play Sound</button> */}
      {/* <button onClick={playSound}>Play Sound</button> */}

    </div>
  );
}

export default Loading;
