import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleClick } from "../../Redux/sidenav";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImCross } from "react-icons/im";
// import * as Icons from "react-icons/all";
import "./Navbar.css";

const Navbar = () => {
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
        <h1 className="nav-title">Shwifty Hoops</h1>
        {/* <CgProfile
          className="three-dots"
          onClick={() => alert("working")}
        ></CgProfile> */}
        <button onClick={() => alert("working")} className="login-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
