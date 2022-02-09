import React from "react";
// import { IoMdBasketball } from "react-icons/io";
// import backGroundImg from "/public/NBAstates.jpg"
import "./Searchbar.css";

const SearchBar = () => {
  return (
    <div>
      <div className="search-con">
        <div>
          <input
            type="text"
            placeholder="&#xf434; Search Games"
            className="search-bar"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
