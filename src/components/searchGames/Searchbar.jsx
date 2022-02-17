import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdBasketball } from "react-icons/io";
import { setShowLogin } from "../../Redux/app";
import { Link } from "react-router-dom";
import "./Searchbar.scss";

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
  // console.log(gamesList);
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

        <div className="gameCard-con">
          {gamesList.map((game) => {
            return (
          
              <div key={game.id} className="game-card">
                <div className="gameContent">
                  <h1>State:{game.state}</h1>
                  <h1>City:{game.city}</h1>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default SearchBar;
