import React from "react";
import axios from "axios";
// Redux
import { useDispatch, useSelector } from "react-redux";
// App State
import { loginUser, setShowLogin } from "../../Redux/app";
// Formik
import { useFormik } from "formik";
// Router
import { useNavigate, Link, useLocation } from "react-router-dom";
// Icons
import { AiFillCloseCircle } from "react-icons/ai";
import { ImKey } from "react-icons/im";
import { MdAlternateEmail } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
//
import "./Login.scss";

const Login = () => {
  // Global State
  const { showLogin } = useSelector((state) => state.showLogin);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("/login", values);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(loginUser());
        dispatch(setShowLogin(false));
        navigate(location.pathname);
        // window.location.reload();
      } catch {
        console.error((err) => {
          console.log(err.response.data);
        });
      }
      resetForm({ values: "" });
    },
    validate,
  });
  return (
    <div className={`overlay ${showLogin ? "show" : "hide"}`}>
      <div className="login-con">
        <AiFillCloseCircle
          className="close-login"
          onClick={() => dispatch(setShowLogin(false))}
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
        <Link to="signup" onClick={() => dispatch(setShowLogin(false))}>
          <span className="login-q">dont have an account?</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
