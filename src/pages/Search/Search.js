import React from "react";
import Searchbar from "../../components/search/Searchbar";
import "./Search.css";
const backgrndImg = "https://wallpapercave.com/wp/wp7673086.jpg";

const Search = () => {
  return (
    <>
      <img src={backgrndImg} alt="" />
      <Searchbar />
    </>
  );
};

export default Search;
