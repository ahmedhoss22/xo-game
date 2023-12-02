import Link from 'next/link'
import './chooseLanguage.scss'

import country from "../../assets/country-flag.png";
const ChooseLanguage = () => {
  return (
    <> 
      <Link href={"/"} className="text-decoration-none">
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
