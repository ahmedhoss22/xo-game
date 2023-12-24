import Link from 'next/link'
import './chooseLanguage.scss'
import useSound from "use-sound"; 
import sound from "../../assets/sound/s.mp3";

import country from "../../assets/photos/country-flag.png";
const ChooseLanguage = () => {
  const [play] =useSound(sound)
  return (
    <> 
      <Link href={"/"} className="text-decoration-none" onClick={play}>
        {" "}
        <div className=" language-btn d-flex align-items-center justify-content-center  border-radius-20 m-2 transform-btn pointer ">
          <button className="text-white ">أختر اللغة</button>
          <img src={country.src} alt="" />
        </div>
      </Link>
      
    </>
  )
}

export default ChooseLanguage
