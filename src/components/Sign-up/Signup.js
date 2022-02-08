import React from "react";
import { useFormik } from "formik";
import "./Signup.css";

const Signup = () => {
  const validate = (values) => {
    let errors = {};
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
    );
    let passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g);

    if (!values.userName) {
      errors.userName = "*Required";
    } else if (values.userName.length <= 2) {
      errors.userName = "Please enter a valid name";
    }
    if (!values.firstName) {
      errors.firstName = "*Required";
    }
    if (!values.lastName) {
      errors.lastName = "*Required";
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
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm({ values: "" });
    },
    validate,
  });

  return (
    <div className="signup-con">
      <h1 className="signup-title">Create Your Account</h1>
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <div className="signup-input-con">
          {formik.errors.userName ? (
            <span className="signup-error">{formik.errors.userName}</span>
          ) : null}
          <input
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="userName"
            type="text"
            placeholder="Username"
            className="signup-input"
          />
          <div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <span className="signup-error">{formik.errors.firstName}</span>
            ) : null}
          </div>
          <input
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="firstName"
            type="text"
            placeholder="First Name"
            className="signup-input"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="signup-error">{formik.errors.lastName}</span>
          ) : null}
          <input
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="signup-input"
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="signup-error">{formik.errors.email}</span>
          ) : null}
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            type="text"
            placeholder="Email"
            className="signup-input"
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="signup-error">{formik.errors.password}</span>
          ) : null}
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            type="password"
            placeholder="Password"
            className="signup-input"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <span className="signup-error">{formik.errors.rePassword}</span>
          ) : null}
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            type="password"
            placeholder="Confirm Password"
            className="signup-input"
          />
          <button type="submit" className="signup-btn">
            Lets Hoop
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
