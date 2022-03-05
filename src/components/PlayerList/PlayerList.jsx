import React from "react";

// Spinners
import { ClipLoader } from "react-spinners";
// CSS
import "./PlayerList.scss";

const PlayerList = ({ players }) => {
  return (
    <div className="players-con">
      <h1>Current Players</h1>
      {players ? (
        players.map((player) => {
          return (
            <div key={player.id} className="playerCard">
              <div className="profBubble">
                <h1 className="playerInitials">
                  {player.firstname[0]}
                  {player.lastname[0]}
                </h1>
              </div>
              <div className="playerDetails">
                <h1 className="playerName">{player.firstname}</h1>
                <h1 className="playerName">{player.lastname}</h1>
                <div>
                  <h1 className="playerStatus">Status: {player.status}</h1>
                </div>
              </div>
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
