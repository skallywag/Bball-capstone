import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { handleClick } from "../../Redux/sidenav";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import Login from "../Login/Login";
import "./Navbar.css";

const Navbar = () => {
  const [pageTitle, setPageTitle] = useState("Shwifty Hoops");

  const usePathname = () => {
    const location = useLocation();
    const pageTitle = location.pathname.split("/")[1].toUpperCase();
    console.log(location.pathname);
    return setPageTitle(pageTitle);
  };

  const [showLogin, setShowLogin] = useState(false);
  const { sidenav } = useSelector((state) => state.sidenav);
  const dispatch = useDispatch();
  return (
    <div className="nav-wrapper">
      <div className="nav-bar">
        {sidenav ? (
          <ImCross
            className="hamburger"
            onClick={() => dispatch(handleClick(!sidenav))}
          />
        ) : (
          <FaBars
            className="hamburger"
            onClick={() => dispatch(handleClick(!sidenav))}
          />
        )}
        <h1 className="nav-title">{}</h1>
        {/* <CgProfile
          className="three-dots"
          onClick={() => alert("working")}
        ></CgProfile> */}
        <button onClick={() => setShowLogin(true)} className="login-btn">
          Login
        </button>
      </div>
      <Login show={showLogin} setShowLogin={setShowLogin} />
    </div>
  );
};

export default Navbar;
