import "./user.scss";
import Title from "../../components/title/title";
import Footer from "@/components/footer/Footer";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
import settingImage from "../../assets/photos/Settings.png";
import userImage from "../../assets/photos/girl-icon-user.png";
import { FaArrowLeft } from "react-icons/fa";
const user = () => {
  return (
    <div className=" user ">
      <div className="container ">
        <div className="row d-flex justify-content-between pt-4">
          <div className="col-1">
            <FaArrowLeft className="text-white pointer h-5 mt-10" />
          </div>

          <div className="col-6">
            <Title />
          </div>

          <div className="col-lg-3 col-md-4 ">
            <ChooseLanguage />
          </div>
          <div className="col-1">
            <img src={settingImage.src}  alt="settings" />
          </div>
        </div>
        <div className="user-info rtl    d-flex  align-items-center mb-2 mt-10  ">
          <img src={userImage.src} className="" alt="user" />
          <h2 className="text-white ms-4">روان عبدالفتاح</h2>

        </div>
        <div className="user-score rtl mb-4  d-flex text-white justify-content-between text-center">
            <h2>مجموع البارايات التي فزت بها</h2>
            <h2>0</h2>
          </div>
          <div className="user-score   rtl mb-4  d-flex text-white justify-content-between text-center">
           <h2>النقود</h2>
            <h2>0</h2>
          </div>
          <div className="user-score   rtl mb-4  d-flex text-white justify-content-between text-center">
            <h2> المستوي</h2>
            <h2>0</h2>
          </div>
          <div className="user-score   rtl mb-4  d-flex text-white justify-content-between text-center">
            <h2>المستوي</h2>
            <h2>0</h2>
          </div>
        {/* </div> */}
      </div>
      <div className='fixed-bottom rtl'>
   <Footer/>
        </div>    </div>
  );
};

export default user;
