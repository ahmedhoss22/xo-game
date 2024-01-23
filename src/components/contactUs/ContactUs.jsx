 
import { BsWhatsapp } from "react-icons/bs";
import whatsappImg from '../../assets/photos/w.png'
const ContactUS = () => { 
  const whatsappNumber = "+1211484800";

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pointer" onClick={handleWhatsAppClick} style={{
        // position: "fixed",
        // bottom:" 16px", 
        // left: "16px", 
        marginLeft:'40px',
        zIndex: "1000",
        color :"green",
        fontSize:'45px'
    }}>
  {/* <BsWhatsapp   /> */}
  <img src={whatsappImg.src} style={{width:'60px', height:'60px'}} alt="" />

    </div>
  );
};

export default ContactUS;
