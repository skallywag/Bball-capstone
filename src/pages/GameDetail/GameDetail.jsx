import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PlayerList from "../../components/PlayerList/PlayerList";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { setShowLogin } from "../../Redux/app";
import qs from "query-string";
import "./GameDetail.scss";

const GameDetail = () => {
  // Local State
  const [userId, setUserId] = useState();
  const [gameDetail, setGameDetail] = useState();
  const [isJoined, setIsJoined] = useState(false);
  // console.log(isJoined);

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
        setUserId(userId);
      } catch {
        console.error();
      }
    } else {
      dispatch(setShowLogin(true));
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
            <button onClick={() => joinGame()} className="gameAction">
              Join Game
            </button>
          ) : (
            <button className="gameAction">Leave Game</button>
          )}
        </div>
      </div>
      <PlayerList gameId={gameId} userId={userId} isJoined={isJoined} />
    </div>
  );
};

export default GameDetail;
