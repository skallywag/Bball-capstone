import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import navItems from "./NavbarData";
import "./Navbar.css";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-wrapper">
      <div className="nav-bar">
        <BsThreeDotsVertical
          className="three-dots"
          onClick={() => alert("working")}
        ></BsThreeDotsVertical>
        <h1 className="nav-title">Shwifty Hoops</h1>
        <FaBars className="hamburger" onClick={() => setShowNav(true)}></FaBars>
      </div>

      <div className={`link-con ${showNav ? "show" : "hide"}`}>
        <ul className="nav-links">
          {navItems.map((item, idx) => {
            return (
              <li key={idx}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
