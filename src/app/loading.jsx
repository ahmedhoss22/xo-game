import localFont from "next/font/local"; 

const myFont = localFont({ src: "../assets/fonts/Pacifico-Regular.ttf" });

const Loading = () => {
  return (
    <div className="not-found-page" >

      <div style={{ color: "#8c0e68", zIndex: "100" }}>
        <div style={myFont.style}>
          <h1 className="fw-bold">Loading page ...... </h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
