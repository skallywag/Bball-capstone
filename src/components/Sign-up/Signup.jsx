import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// Icons
import {
  FaUserTag,
  FaUserTie,
  FaSignature,
  FaUnlock,
  FaLock,
} from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "./Signup.scss";

const Signup = () => {
  // Local State
  const [acctCreated, setAcctCreated] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    let errors = {};
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
    );
    let passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g);

    if (!values.userName) {
      errors.userName = "*Required";
    } else if (values.userName.length < 4) {
      errors.userName = "Username must be more than 4 characters";
    }
    if (!values.firstName) {
      errors.firstName = "*Required";
    } else if (values.firstName.length <= 2) {
      errors.firstName = "Name must be more than 2 characters";
    }

    if (!values.lastName) {
      errors.lastName = "*Required";
    } else if (values.lastName.length <= 2) {
      errors.lastName = "Last name must be 3 characters or more";
    }
    if (!values.email) {
      errors.email = "*Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!values.password) {
      errors.password = "*Required";
    } else if (!passRegex.test(values.password)) {
      errors.password = "Please enter a valid password";
    }
    if (!values.rePassword) {
      errors.rePassword = "Required";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Passwords dont match";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:5432/register",
          values
        );
        setAcctCreated(response.data);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
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
    <div className="signup-con">
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <div className="signup-input-con">
          {formik.touched.userName && formik.errors.userName ? (
            <span className="input-error">{formik.errors.userName}</span>
          ) : null}

          <div className="flex align-center signup-input-ctn">
            <FaUserTag className="signup-icon" />
            <input
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="userName"
              type="text"
              placeholder="Username"
              className="signup-input"
            />
          </div>

          {formik.touched.firstName && formik.errors.firstName ? (
            <span className="input-error">{formik.errors.firstName}</span>
          ) : null}

          <div className="flex align-center signup-input-ctn">
            <FaUserTie className="signup-icon" />
            <input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="firstName"
              type="text"
              placeholder=" First Name"
              className="signup-input"
            />
          </div>

          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="input-error">{formik.errors.lastName}</span>
          ) : null}

          <div className="flex align-center signup-input-ctn">
            <FaSignature className="signup-icon" />
            <input
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="signup-input"
            />
          </div>

          {formik.touched.email && formik.errors.email ? (
            <span className="input-error">{formik.errors.email}</span>
          ) : null}

          <div className="flex align-center signup-input-ctn">
            <MdOutlineAlternateEmail className="signup-icon" />
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              type="text"
              placeholder="Email"
              className="signup-input"
            />
          </div>

          {formik.touched.password && formik.errors.password ? (
            <span className="input-error">{formik.errors.password}</span>
          ) : null}

          <div className="flex align-center signup-input-ctn">
            <FaUnlock className="signup-icon" />
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              type="password"
              placeholder="Password"
              className="signup-input"
            />
          </div>

          {formik.touched.rePassword && formik.errors.rePassword ? (
            <span className="input-error">{formik.errors.rePassword}</span>
          ) : null}

          <div className="flex align-center signup-input-ctn">
            <FaLock className="signup-icon" />
            <input
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="rePassword"
              type="password"
              placeholder="Confirm Password"
              className="signup-input"
            />
          </div>

          <button type="submit" className="signup-btn">
            Lets Hoop
          </button>
          {acctCreated ? (
            <span style={{ color: "white" }}>Account Created!</span>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Signup;
