"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./support.scss";

const support = () => {
  function handleAnswer(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    answer: Yup.string().required("برجاء ادخال رساله سياسة الخصوصية ."),
  });

  let formik = useFormik({
    initialValues: {
      answer: "",
    },
    validationSchema,
    onSubmit: handleAnswer,
  });

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
                      الرسالة{" "}
                    </th>
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
                      <form onSubmit={formik.handleSubmit}>
                        <textarea
                          id="answer"
                          name="answer"
                          value={formik.values.answer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border-radues-20 form-control mb-4"
                          rows="3"
                        />
                        <div className="d-flex justify-content-between">
                          <button
                            type="submit"
                            className="edit-btn fw-bold transform-btn "
                          >
                            أرسال الرد
                          </button>
                          <button className="delete-btn fw-bold transform-btn ">
                            حذف
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default support;
