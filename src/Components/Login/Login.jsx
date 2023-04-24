import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";


export default function Login({ saveUserData }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [Loader, setLoader] = useState(false);

  let navigate = useNavigate();

  async function login(values) {
    setLoader(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoader(false);
      });
    if (data.message == "success") {
      setLoader(false);
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setErrorMessage(null);
      navigate("/");
    }
  }

  let mySchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{7}/,
        "password must start with capital letter and its length is 8 lettters"
      ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => login(values),
  });
  return (
    <div className="w-75 mx-auto">
      <h3 className="mb-4">Login Now</h3>
      {errorMessage ? <p className="alert alert-danger">{errorMessage}</p> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
        </div>
        <button onSubmit={formik.handleSubmit} className="btn btn-info">
          {Loader ? (
            <i className="fa fa-spin fa-spinner"></i>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );
}
