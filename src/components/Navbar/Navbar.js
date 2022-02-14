import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { handleClick } from "../../Redux/sidenav";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import Login from "../Login/Login";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, logFunction }) => {
  const [showLogin, setShowLogin] = useState(false);
  const { sidenav } = useSelector((state) => state.sidenav);
  const dispatch = useDispatch();

  const location = useLocation();
  let pageTitle = location.pathname.split("/")[1];

  return (
    <div className="nav-wrapper">
      <div className="nav-bar">
        {sidenav ? (
          <ImCross
            className="cross"
            onClick={() => dispatch(handleClick(!sidenav))}
          />
        ) : (
          <FaBars
            className="hamburger"
            onClick={() => dispatch(handleClick(!sidenav))}
          />
        )}
        <h1 className="nav-title">{pageTitle ? pageTitle : "Shwifty Hoops"}</h1>

        {isLoggedIn ? (
          <div className="logged-in-ctn">
            <Link style={{ fontStyle: "none", color: "black" }} to="profile">
              <CgProfile className="profile-icon"></CgProfile>
            </Link>
            <button
              className="nav-logout-btn"
              onClick={() => setIsLoggedIn(!true)}
            >
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
        show={showLogin}
        setShowLogin={setShowLogin}
        logFunction={logFunction}
      />
    </div>
  );
};

export default Navbar;
