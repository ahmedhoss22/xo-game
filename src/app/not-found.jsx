import localFont from "next/font/local"; 
const myFont = localFont({ src: "../assets/fonts/Pacifico-Regular.ttf" });

const NotFound = () => {
  return (
    <div className="not-found-page" >
      <div style={{ color: "#8c0e68", zIndex: "100" }}>
        <div style={myFont.style}>
          <h1 className="fw-bold">404 | Page not found ... </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
