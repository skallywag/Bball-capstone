import React from "react";
import { useSelector } from "react-redux";
import { handleLinkChange } from "../../Redux/sidenav";
import navItems from "../Navbar/navItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GrInstagram } from "react-icons/gr";
import { GrFacebook } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";
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
        {isLoggedIn && (
          <Link
            onClick={() => dispatch(handleLinkChange())}
            className="nav-link"
            to="/profile"
          >
            <li>Dashboard</li>
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
