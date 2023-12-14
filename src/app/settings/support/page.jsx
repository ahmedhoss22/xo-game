import './support.scss'

const support = () => {
  return (
    <div className="support rtl">
    <div className="container">
      <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
        <h5> اسم المستخدم</h5>
        <h5>الايميل </h5>
        <h5>الرسالة   </h5>
      </div>
      <div className="row pt-4">
        <div className=" col-lg-12 d-flex align-items-center justify-content-around  text-white ">
        <p> روان عبدالفتاح </p>
        <p>rwanabdelfattah301@gmail.com </p>
        <div className='col-lg-4'>
          <textarea name="" id="" className=' border-radues-20 form-control mb-4' rows="3"> </textarea>
            <div className="d-flex justify-content-between">
            <button className="edit-btn fw-bold transform-btn ">أرسال الرد</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
        </div>
            
        </div>
        <hr className='text-white  p-4 mt-1 '/>
        <div className=" col-lg-12 d-flex align-items-center justify-content-around  text-white ">
        <p> روان عبدالفتاح </p>
        <p>rwanabdelfattah301@gmail.com </p>
        <div className='col-lg-4'>
          <textarea name="" id="" className=' border-radues-20 form-control mb-4' rows="3"> </textarea>
            <div className="d-flex justify-content-between">
            <button className="edit-btn fw-bold transform-btn ">أرسال الرد</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
        </div>
            
        </div>
        <hr className='text-white  p-4 mt-1 '/>
     
      </div>

    </div>
  </div>
  )
}

export default support
