import React from "react";
import "./Searchbar.css";

const SearchBar = () => {
  return (
    <div className="search-con">
      <div>
        <input type="text" placeholder="Search games" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
