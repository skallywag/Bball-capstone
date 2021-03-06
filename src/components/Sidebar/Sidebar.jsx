import React from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// App State
import { closeSideNav } from "../../Redux/app";
// Icons
import { GrInstagram, GrFacebook, GrTwitter } from "react-icons/gr";
// Nav Link Import
import navItems from "../Navbar/navItems";
// CSS
import "./Sidebar.scss";

const Sidebar = () => {
  // Global State
  const { showSideNav } = useSelector((state) => state.showSideNav);
  const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
  // Hooks
  const dispatch = useDispatch();

  return (
    <div className={`side-bar ${showSideNav ? "show" : "hide"}`}>
      <ul className="nav-links">
        {navItems.map((item, idx) => {
          return (
            <Link
              onClick={() => dispatch(closeSideNav())}
              to={item.url}
              key={idx}
              className={item.cName}
            >
              <li>{item.title}</li>
            </Link>
          );
        })}
        {isLoggedIn ? (
          <Link
            onClick={() => dispatch(closeSideNav())}
            className="nav-link"
            to="/profile"
          >
            <li>Dashboard</li>
          </Link>
        ) : (
          <Link
            onClick={() => dispatch(closeSideNav())}
            className="nav-link"
            to="/signup"
          >
            <li>Sign Up</li>
          </Link>
        )}
      </ul>
      <div className="social-con">
        <a className="social-link" href="https://facebook.com" target="blank">
          <GrFacebook className="social-icon" />
        </a>
        <a className="social-link" href="https://twitter.com" target="blank">
          <GrTwitter className="social-icon" />
        </a>
        <a className="social-link" href="https://instagram.com" target="blank">
          <GrInstagram className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
