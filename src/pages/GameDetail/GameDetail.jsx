import React from "react";
import axios from "axios";
import qs from "query-string";
// React
import { useState, useEffect, useRef } from "react";
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
// CSS
import "./GameDetail.scss";

const user = JSON.parse(localStorage.getItem("user"));
const userId = Number(user.id);

const GameDetail = () => {
  // Local State
  const [gameDetail, setGameDetail] = useState();
  const [isJoined, setIsJoined] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playerStatus, setPlayerStatus] = useState("");

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

  useEffect(() => {
    async function initializePlayers() {
      try {
        const { data } = await axios.post("http://localhost:5432/getPlayers", {
          gameId: Number(gameId),
        });
        setPlayers(data);
        setIsJoined(data.find((player) => player.userid === userId));
      } catch {
        console.error();
      }
    }
    initializePlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const { data } = await axios.post("http://localhost:5432/getPlayers", {
        gameId: Number(gameId),
      });
      setPlayers(data);
    } catch {
      console.error();
    }
  };

  const joinGame = async () => {
    if (isLoggedIn) {
      try {
        await axios.put(
          `http://localhost:5432/joinGame/${gameId}/?userId=${userId}`
        );
        setIsJoined(true);
        getPlayers();
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
      await axios.delete(
        `http://localhost:5432/removePlayer/?userId=${userId}`
      );
      setIsJoined(false);
      getPlayers();
    } catch {
      console.error();
    }
  };

  const handleStatusChange = async (value) => {
    console.log(value);
    try {
      const response = await axios.put();
    } catch {
      console.error();
    }
  };
  return (
    <div className="detail-wrapper">
      <div className="detailCon">
        {gameDetail ? (
          <div className="detailCard">
            {/* <MapContainer /> */}
            <h1 className="detailLocation">{gameDetail.venue}</h1>
            <div className="detailContent-con">
              <div className="detail-con">
                <span className="detailTitle">Address</span>
                <span className="detail">{gameDetail.address}</span>
              </div>
              <div className="detail-con">
                <span className="detailTitle">City</span>
                <span className="detail">{gameDetail.city}</span>
              </div>
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
                <span className="detail">{players.length}</span>
              </div>
            </div>
          </div>
        ) : (
          <ClipLoader />
        )}
        {/* <div className="gameAction-con"> */}
        {isJoined ? (
          <div className="gameAction-con">
            <button onClick={() => leaveGame()} className="gameAction">
              Leave Game
            </button>

            <select
              name="playerStatus"
              id="playerStatus"
              className="gameAction"
              // value={playerStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="" label="Set Status" />
              <option value="Here" label="Here">
                Here
              </option>
              <option value="Enroute" label="Enroute" />
              <option value="Be there soon" label="Be there soon" />
            </select>
          </div>
        ) : (
          <button onClick={() => joinGame()} className="gameAction">
            Join Game
          </button>
        )}
      </div>
      {/* </div> */}
      <PlayerList players={players} />
    </div>
  );
};

export default GameDetail;
