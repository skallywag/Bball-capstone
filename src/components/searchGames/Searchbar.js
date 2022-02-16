import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoMdBasketball } from "react-icons/io";
import "./Searchbar.css";

const SearchBar = () => {
  const [input, setInput] = useState("");
  // const [gamesList, setGamesList] = useState([]);
  const navigate = useNavigate();

  const handleInput = (value) => {
    setInput(value);
  };

  // Dbounce = lodash
  // useEffect(() => {
  //   const search = { input: input };
  //   async function getGames() {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5432/games",
  //         search
  //       );
  //       console.log(response.data);
  //     } catch {
  //       console.error();
  //     }
  //   }
  //   getGames();
  // }, [input]);

  return (
    <div className="search-con">
      <button onClick={() => navigate("/create")} className="create-btn">
        Create Game
      </button>

      <div className="flex align-center search-bar-ctn">
        <IoMdBasketball className="search-icon" />
        <input
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          placeholder="Search Games"
          className="search-bar"
        />
      </div>
    </div>
  );
};

export default SearchBar;
