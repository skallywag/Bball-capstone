import React from "react";
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Spinners
import { ClipLoader } from "react-spinners";
// CSS
import "./PlayerList.scss";

const PlayerList = ({ players }) => {
  // Local State

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
