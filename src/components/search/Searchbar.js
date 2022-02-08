import React from "react";
import { IoMdBasketball } from "react-icons/io";
import "./Searchbar.css";

const SearchBar = () => {
  return (
    <div className="search-con">
      <div>
        <input
          type="text"
          placeholder="&#xf434; Search Games"
          className="search-bar"
        />
      </div>
    </div>
  );
};

export default SearchBar;
