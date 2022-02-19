import React from "react";
import axios from "axios";
import qs from "query-string";
// React
import { useState, useEffect } from "react";
// Router
import { useLocation } from "react-router-dom";
// Spinners
import { ClipLoader } from "react-spinners";
// Redux
import { useSelector, useDispatch } from "react-redux";
// App State
import { setShowLogin } from "../../Redux/app";
// Components
import PlayerList from "../../components/PlayerList/PlayerList";
import "./GameDetail.scss";

const GameDetail = () => {
  // Local State
  const [userId, setUserId] = useState();
  const [gameDetail, setGameDetail] = useState();
  const [isJoined, setIsJoined] = useState(false);
  const [didLeave, setDidLeave] = useState(false);

  //Global State/Hooks
  const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  // grab search parameter, convert to an obj
  const location = useLocation();
  const { gameId } = qs.parse(location.search);

  useEffect(() => {
    async function getGame() {
      try {
        const response = await axios.get(
          `http://localhost:5432/game/${gameId}`
        );
        const gameData = response.data;
        setGameDetail(gameData);
      } catch {
        console.error();
      }
    }
    getGame();
  }, []);

  const joinGame = async () => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      try {
        await axios.put(
          `http://localhost:5432/joinGame/${gameId}/?userId=${userId}`
        );
        setIsJoined(true);
      } catch {
        console.error();
      }
    } else {
      dispatch(setShowLogin(true));
    }
  };

  const leaveGame = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    try {
      const res = await axios.delete(
        `http://localhost:5432/removePlayer/?userId=${userId}`
      );
      setDidLeave(true);
      setIsJoined(false);
    } catch {
      console.error();
    }
  };
  return (
    <div className="detail-wrapper">
      <div className="detailCon">
        {gameDetail ? (
          <div className="detailCard">
            <h1 className="detailLocation">{gameDetail.venue}</h1>
            <div className="detailContent-con">
              <div className="detail-con">
                <span className="detailTitle">Skill Level</span>
                <span className="detail">{gameDetail.skill}</span>
              </div>
              <div className="detail-con">
                <span className="detailTitle">Duration</span>
                <span className="detail">{gameDetail.duration}Min</span>
              </div>
              <div className="detail-con">
                <span className="detailTitle">Age Group</span>
                <span className="detail">{gameDetail.agegroup}</span>
              </div>
              <div className="detail-con">
                <span className="detailTitle">Players</span>
                <span className="detail">5</span>
              </div>
            </div>
          </div>
        ) : (
          <ClipLoader />
        )}
        <div className="gameActions">
          {isJoined ? (
            <button onClick={() => leaveGame()} className="gameAction">
              Leave Game
            </button>
          ) : (
            <button onClick={() => joinGame()} className="gameAction">
              Join Game
            </button>
          )}
        </div>
      </div>
      <PlayerList
        gameId={gameId}
        userId={userId}
        isJoined={isJoined}
        didLeave={didLeave}
      />
    </div>
  );
};

export default GameDetail;
