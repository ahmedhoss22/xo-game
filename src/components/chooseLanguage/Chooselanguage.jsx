import anImg from "../../assets/photos/an.png";
import enImg from "../../assets/photos/en.png";
import { useTranslation } from "react-i18next";

const ChooseLanguage = () => {
  const { i18n } = useTranslation();

  function toggleLanguage() {
    if (i18n.language == "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  }

  return (
    <div onClick={toggleLanguage} className="pointer" >
      {i18n.language == "ar" ? (
        <div className=" d-flex align-items-center justify-content-center gap-1 ">
        {" "}
          <span className="text-white m-0"style={{margin:'0px'}}>Ar</span>
          <img
            src={anImg.src}
            alt="Arabic"
            style={{ height: "35px", width: "35px" }}
          />
        </div>
      ) : (
        <div className="m-0 d-flex align-items-center justify-content-center gap-1 ">
          {" "}
          <span className="text-white m-0" style={{margin:'0px'}}>En</span>
          <img
            src={enImg.src}
            alt="English"
            style={{ height: "35px", width: "35px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ChooseLanguage;
