import React from "react";
import { useSelector } from "react-redux";
import { handleLinkChange } from "../../Redux/sidenav";
import navItems from "../Navbar/navItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Sidebar.css";

const Sidebar = () => {
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
      </ul>
    </div>
  );
};

export default Sidebar;
