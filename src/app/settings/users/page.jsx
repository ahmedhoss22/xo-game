import "./users.scss";

const users = () => {
  return (
    <div className="users rtl">
      <div className="container">
        <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
          <h5>أسم المستخدم</h5>
          <h5>الأيميل </h5>
          <h5>رقم الهاتف </h5>
          <h5>المحفظة </h5>
          <h5>الأعدادت </h5>
        </div>
        <div className="row pt-4">
          <div className=" col-12 d-flex align-items-center justify-content-around  text-white ">
          <p>أسم المستخدم</p>
          <p>الأيميل </p>
          <p>رقم الهاتف </p>
          <p>المحفظة </p>
          <div className="d-flex gap-5">
          <button className="edit-btn fw-bold transform-btn ">تعديل</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
          </div>
          <hr className='text-white  p-4 mt-1 '/>
          <div className=" col-12 d-flex align-items-center justify-content-around  text-white ">
          <p>أسم المستخدم</p>
          <p>الأيميل </p>
          <p>رقم الهاتف </p>
          <p>المحفظة </p>
          <div className="d-flex gap-5">
            <button className="edit-btn fw-bold transform-btn ">تعديل</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
          </div>
          <hr className='text-white  p-4 mt-1 '/>
       
          <button className="text-white col-md-2 transform-btn  ">أنشاء حساب </button>
        </div>
 
      </div>
    </div>
  );
};

export default users;
