import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import qs from "query-string";
import "./GamesList.scss";

const GamesList = ({ gamesList }) => {
  // const [players, setPlayers] = useState([]);
  // const [gameId, setGameId] = useState([]);

  // useEffect(() => {
  //   async function initialPlayers() {

  //     try {
  //       const { data } = await axios.post("http://localhost:5432/getPlayers", {
  //         gameId: Number(gameId),
  //       });
  //       setPlayers(data);
  //     } catch {
  //       console.error();
  //     }
  //   }
  //   initialPlayers();
  // }, []);

  return (
    <div className="gameCard-con">
      {gamesList.map((game) => {
        const query = qs.stringify({
          gameId: game.id,
        });
        return (
          <Link to={`/gameDetail?${query}`} className="gameLink" key={game.id}>
            <div className="gameCard">
              <div className="gameContent">
                <h1 className="gameLocation">Location: {game.venue}</h1>
                <span className="gameCity">{game.city}, UT</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default GamesList;
