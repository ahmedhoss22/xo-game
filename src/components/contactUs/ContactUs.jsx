 
import { BsWhatsapp } from "react-icons/bs";

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
        fontSize:'35px'
    }}>
  <BsWhatsapp   />

    </div>
  );
};

export default ContactUS;
