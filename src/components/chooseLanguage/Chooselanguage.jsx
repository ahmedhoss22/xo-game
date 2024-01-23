import Link from 'next/link'
import './chooseLanguage.scss'
import useSound from "use-sound"; 
import sound from "../../assets/sound/s.mp3";

import country from "../../assets/photos/country-flag.png";
import { useTranslation } from 'react-i18next';
const ChooseLanguage = () => {
  const { t, i18n } = useTranslation();
  const [play] =useSound(sound)
  
  function toggleLanguage(){
    if(i18n.language == "ar"){
      i18n.changeLanguage("en")
    }else{
      i18n.changeLanguage("ar")
    }
  }
  return (
    <> 
      <Link href={"/"} className="text-decoration-none" onClick={play}>
        {" "}
        <div className=" language-btn d-flex align-items-center justify-content-center  border-radius-20 m-2 transform-btn pointer ">
          <button className="text-white "  onClick={toggleLanguage}>أختر اللغة</button>
          <img src={country.src} alt="" />
        </div>
      </Link>
      
    </>
  )
}

export default ChooseLanguage
