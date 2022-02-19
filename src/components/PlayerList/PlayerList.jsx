import React from "react";
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Spinners
import { ClipLoader } from "react-spinners";
// CSS
import "./PlayerList.scss";

const PlayerList = ({ gameId, isJoined }) => {
  // Local State
  const [players, setPlayers] = useState();

  const game = {
    gameId,
  };
  useEffect(() => {
    async function getPlayers() {
      try {
        const response = await axios.post(
          "http://localhost:5432/getPlayers",
          game
        );
        const playerData = response.data;
        setPlayers(playerData);
      } catch {
        console.error();
      }
    }
    getPlayers();
  }, [isJoined]);

  return (
    <div className="players-con">
      <h1>Current Players</h1>
      {players ? (
        players.map((player) => {
          return (
            <div key={player.id} className="playerCard">
              <div className="prof-bubble"></div>
              <h1 className="playerName">{player.firstname}</h1>
            </div>
          );
        })
      ) : (
        <ClipLoader />
      )}
    </div>
  );
};
export default PlayerList;
