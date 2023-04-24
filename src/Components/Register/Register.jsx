import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();


  async function register(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
        console.log(values);
      })
    if (data.message == "success") {
      setLoading(false);
      navigate("/login");
    }
  }

  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "minimum name is 3 letters")
      .max(15, "maximum name is 15 letter "),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invaild password"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "not egyption phone"),
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
    onSubmit: (values) => register(values),
  });

  return (
    <div className="w-75 mx-auto">
      <h3>Register Now</h3>
      {apiError ? <p className="alert alert-danger">{apiError}</p> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}
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
          <label htmlFor="rePassword">rePassword</label>
          <input
            type="password"
            className="form-control mb-3"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}
        </div>
        <button onSubmit={formik.handleSubmit} className="btn btn-info">
          {loading ? (
            <i className="fa fa-spin fa-spinner"></i>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>
    </div>
  );
}
