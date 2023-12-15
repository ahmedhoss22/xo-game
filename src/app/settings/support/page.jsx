import './support.scss'

const support = () => {
  return (
    <div className="support rtl">
    <div className="container">

    <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      اسم المستخدم
                    </th>

                    <th scope="col" className="px-6 py-3">
                      الأيميل
                    </th>
                    <th scope="col" className="px-6 py-3">
الرسالة                    </th>

                  
                  
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      روان
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      rwanabdelfattah301@gmail.com
                    </td>
                    
                    
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    <textarea name="" id="" className=' border-radues-20 form-control mb-4' rows="3"> </textarea>
            <div className="d-flex justify-content-between">
            <button className="edit-btn fw-bold transform-btn ">أرسال الرد</button>
            <button className="delete-btn fw-bold transform-btn ">حذف</button>
          </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>


      {/* <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
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
     
      </div> */}

    </div>
  </div>
  )
}

export default support
