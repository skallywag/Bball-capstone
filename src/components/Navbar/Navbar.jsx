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
    // window.location.reload();
    navigate("/");
  };

  return (
    <div className="navWrapper">
      <div className="navBar">
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
        <h1 className="navTitle">{pageTitle ? pageTitle : "Eternal Hoops"}</h1>

        {isLoggedIn ? (
          <div className="loggedIn-ctn">
            <Link style={{ fontStyle: "none", color: "black" }} to="profile">
              <CgProfile className="profile-icon"></CgProfile>
            </Link>
            <button className="navLogout-btn" onClick={userLogout}>
              Log-out
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch(setShowLogin(true))}
            className="navLogin-btn"
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
