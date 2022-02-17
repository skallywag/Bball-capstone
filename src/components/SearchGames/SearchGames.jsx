import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdBasketball } from "react-icons/io";
import { setShowLogin } from "../../Redux/app";
import GamesList from "../GamesList/GamesList";
import "./SearchGames.scss";

const SearchBar = () => {
  //Local State
  const [input, setInput] = useState("");
  const [gamesList, setGamesList] = useState([]);
  //Global State
  const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleInput = (value) => {
    setInput(value);
  };

  // need Dbounce/lodash
  useEffect(() => {
    const search = { input: input };
    async function getGames() {
      try {
        const response = await axios.post(
          "http://localhost:5432/games",
          search
        );
        setGamesList(response.data);
      } catch {
        console.error();
      }
    }
    getGames();
  }, [input]);

  return (
    <div>
      <div className="search-con">
        {isLoggedIn ? (
          <button onClick={() => navigate("/create")} className="create-btn">
            Create Game
          </button>
        ) : (
          <button
            onClick={() => dispatch(setShowLogin(true))}
            className="create-btn"
          >
            Create Game
          </button>
        )}
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
        <GamesList gamesList={gamesList}/>
    </div>
  );
};

export default SearchBar;
