import './usersPoints.scss'
import bg1 from '../../../assets/bg1.png'
import bg2 from '../../../assets/bg2.png'
const usersPoints = () => {
  return (
    <div className="users-points rtl">
    <div className="container">
      <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
        <h5> المستوايات</h5>
        <h5>النقاط المطلوبة للدخول </h5>
        <h5>الخلفية   </h5>
        <button className="fw-bold transform-btn ">اضافة مستوي</button>
      </div>
      <div className="row pt-4">
        <div className=" col-12 d-flex align-items-center justify-content-around  text-white ">
        <p>المستوي 1 </p>
        <p>2000 </p>
        <img src={bg1.src} alt="" />
        <button className="edit-btn fw-bold transform-btn ">تعديل</button>
      
        </div>
        <hr className='text-white  p-4 mt-1 '/>
        <div className=" col-12 d-flex align-items-center justify-content-around  text-white ">
        <p>المستوي 1 </p>
        <p>2000 </p>
        <img src={bg2.src} alt="" />

        <button className="edit-btn fw-bold transform-btn ">تعديل</button>
      
        </div>
        <hr className='text-white  p-4 mt-1 '/>
     
      </div>

    </div>
  </div>
  )
}

export default usersPoints
