import React from "react";
import { useFormik } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { ImKey } from "react-icons/im";
import { MdAlternateEmail } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ show, setShowLogin }) => {
  const validate = (values) => {
    const errors = {};
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
    );

    if (!values.loginEmail) {
      errors.loginEmail = "*Required";
    } else if (!emailRegex.test(values.loginEmail)) {
      errors.loginEmail = "Please enter in a valid email";
    }

    if (!values.loginPass) {
      errors.loginPass = "*Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      loginEmail: "",
      loginPass: "",
    },
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm({ values: "" });
      setShowLogin(false);
    },
    validate,
  });
  return (
    <div className={`overlay ${show ? "show" : "hide"}`}>
      <div className="login-con">
        <AiFillCloseCircle
          className="close-login"
          onClick={() => setShowLogin(false)}
        />
        <form onSubmit={formik.handleSubmit}>
          <div className="login-input-con">
            {formik.touched.loginEmail && formik.errors.loginEmail ? (
              <span className="input-error">{formik.errors.loginEmail}</span>
            ) : null}
            <div className="flex align-center login-input-ctn">
              <MdAlternateEmail className="login-icon" />
              <input
                value={formik.values.loginEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="loginEmail"
                id="loginEmail"
                className="login-input"
                placeholder="Email"
              />
            </div>

            {formik.touched.loginPass && formik.errors.loginPass ? (
              <span className="input-error">{formik.errors.loginPass}</span>
            ) : null}

            <div className="flex align-center login-input-ctn">
              <ImKey className="login-icon" />
              <input
                value={formik.values.loginPass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="loginPass"
                id="loginPass"
                className="login-input"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="login-btn">
              <FaArrowCircleRight className="login-btn-icon" />
            </button>
          </div>
        </form>
        <Link to="signup" onClick={() => setShowLogin(false)}>
          <span className="login-q">dont have an account?</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
