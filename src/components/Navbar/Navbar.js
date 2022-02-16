import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toggleSideNav, setIsLoggedIn } from "../../Redux/app";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import Login from "../Login/Login";
import "./Navbar.css";

const Navbar = ({ logFunction }) => {
  const [showLogin, setShowLogin] = useState(false);
  const { showSideNav } = useSelector((state) => state.showSideNav);
  const { isLoggedIn } = useSelector((state) => state.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let pageTitle = location.pathname.split("/")[1];

  const userLogout = () => {
    localStorage.removeItem("user");
    dispatch(setIsLoggedIn(!true));
    navigate("/");
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-bar">
        {showSideNav ? (
          <ImCross
            className="cross"
            onClick={() => dispatch(toggleSideNav(!showSideNav))}
          />
        ) : (
          <FaBars
            className="hamburger"
            onClick={() => dispatch(toggleSideNav(!showSideNav))}
          />
        )}
        <h1 className="nav-title">{pageTitle ? pageTitle : "Eternal Hoops"}</h1>

        {isLoggedIn ? (
          <div className="logged-in-ctn">
            <Link style={{ fontStyle: "none", color: "black" }} to="profile">
              <CgProfile className="profile-icon"></CgProfile>
            </Link>
            <button className="nav-logout-btn" onClick={userLogout}>
              Log-out
            </button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} className="nav-login-btn">
            Login
          </button>
        )}
      </div>
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        logFunction={logFunction}
      />
    </div>
  );
};

export default Navbar;
