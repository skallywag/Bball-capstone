import React from "react";
import { Link } from "react-router-dom";
import navItems from "../Navbar/navItems";
import { handleLinkChange } from "../../Redux/sidenav";
import { useDispatch, useSelector } from "react-redux";
import { GrInstagram, GrFacebook, GrTwitter } from "react-icons/gr";
import "./Sidebar.css";

const Sidebar = ({ isLoggedIn }) => {
  const { sidenav } = useSelector((state) => state.sidenav);
  const dispatch = useDispatch();

  return (
    <div className={`side-bar ${sidenav ? "show" : "hide"}`}>
      <ul className="nav-links">
        {navItems.map((item, idx) => {
          return (
            <Link
              onClick={() => dispatch(handleLinkChange())}
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
            onClick={() => dispatch(handleLinkChange())}
            className="nav-link"
            to="/profile"
          >
            <li>Dashboard</li>
          </Link>
        ) : (
          <Link
            onClick={() => dispatch(handleLinkChange())}
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
