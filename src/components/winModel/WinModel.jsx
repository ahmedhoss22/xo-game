import "./winModel.scss";

const WinModel = () => {
  return (
    <div>
       <div className='modal text-white '>
      <div className="modal__content">
        <div className="container"> 
         <div className="score model">
        <>
          <p>you win!</p>
          <h3 className='score__title text-yellow  '>Takes the round</h3>
        </>

        <div className="score__btns">
          <button className="btn btn-sm">Quit</button>
          <button className={`btn   btn-sm btn-yellow btn-blue`}>
            Next Round
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
     
    </div>
  );
};

export default WinModel;
