import React from "react";
import { IoMdBasketball } from "react-icons/io";
import "./Searchbar.css";

const SearchBar = () => {
  // Dbounce = lodash
  return (
    <div className="search-con">
      <button className="create-btn">Create Game</button>

      <div className="flex align-center search-bar-ctn">
        <IoMdBasketball className="search-icon" />
        <input type="text" placeholder="Search Games" className="search-bar" />
      </div>
    </div>
  );
};

export default SearchBar;
