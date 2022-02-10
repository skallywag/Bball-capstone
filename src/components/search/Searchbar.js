import React from "react";
// import { IoMdBasketball } from "react-icons/io";
// import backGroundImg from "/public/NBAstates.jpg"
import "./Searchbar.css";

const SearchBar = () => {
  return (
    <div className="search-con">
      <button className="create-btn">Create Game</button>
      <div className="input-con">
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
