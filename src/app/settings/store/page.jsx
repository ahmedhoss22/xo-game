import './store.scss'
import money from '../../../assets/photos/money-bag.png'
import xo from '../../../assets/photos/xo.png'
import tickets from '../../../assets/photos/Ticket.png'
const store = () => {
  return (
    <div className="store rtl">
    <div className="container">
      <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
        <h5>  الاموال</h5>
        <h5>التوكينز </h5>
        <h5>XO   </h5>
        <button className="fw-bold transform-btn ">اضافة مستوي</button>

      </div>
      <div className="row pt-4">
      
        <hr className='text-white  p-4 mt-1 '/>
        <div className=" col-lg-12 d-flex align-items-center justify-content-around  text-white ">
        <div className='col-lg-2'>
          <div className='d-flex  align-items-center justify-content-center'>
       <img src={money.src} alt="" />      
          </div>
           <div className="d-flex justify-content-between">
            <button className="edit-btn fw-bold transform-btn ">تعديل</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
        </div>
            
        <div className='col-lg-2'>
        <div className='d-flex  align-items-center justify-content-center'>
       <img src={tickets.src} alt="" />      
          </div><div className="d-flex justify-content-between">
            <button className="edit-btn fw-bold transform-btn ">تعديل</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
        </div>
            
        <div className='col-lg-2'>
        <div className='d-flex  align-items-center justify-content-center'>
       <img src={xo.src} alt="" />      
          </div>   <div className="d-flex justify-content-between">
            <button className="edit-btn fw-bold transform-btn ">تعديل</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
        </div>
            
        <div className='col-lg-2'>
        </div>
            
        </div>
        <hr className='text-white  p-4 mt-1 '/>
     
      </div>

    </div>
  </div>
  )
}

export default store
