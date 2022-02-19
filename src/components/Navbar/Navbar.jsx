import React from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Router
import { Link, useNavigate, useLocation } from "react-router-dom";
// App State
import { toggleSideNav, setIsLoggedIn, setShowLogin } from "../../Redux/app";
// Icons
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImCross } from "react-icons/im";
// Components
import Login from "../Login/Login";
// CSS
import "./Navbar.scss";

const Navbar = () => {
  //Global State
  const { showSideNav } = useSelector((state) => state.showSideNav);
  const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // Path Title
  const pageTitle = location.pathname.split("/")[1];

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
          <button
            onClick={() => dispatch(setShowLogin(true))}
            className="nav-login-btn"
          >
            Login
          </button>
        )}
      </div>
      <Login />
    </div>
  );
};

export default Navbar;
