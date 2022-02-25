import React from "react";
import axios from "axios";
import qs from "query-string";
// React
import { useState, useEffect } from "react";
// Router
import { useLocation } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
// App State
import { setShowLogin } from "../../Redux/app";
// Components
import PlayerList from "../../components/PlayerList/PlayerList";
import GameCard from "../../components/GameCard/GameCard";
import UpdateGame from "../../components/UpdateGame/UpdateGame";
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete";
// CSS
import "./Game.scss";

const Game = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Local State
  const [gameDetail, setGameDetail] = useState();
  const [players, setPlayers] = useState([]);
  const [isJoined, setIsJoined] = useState(null);
  const [status, setStatus] = useState();
  const [showUpdateGame, setShowUpdateGame] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  // const [host, setHost] = useState(null);

  //Global State/Hooks
  const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // Constants
  const { gameId } = qs.parse(location.search);
  const host = user.id === gameDetail?.userid;

  useEffect(() => {
    async function getGame() {
      if (gameId) {
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
    }
    getGame();
  }, []);

  useEffect(() => {
    async function initialPlayers() {
      try {
        const { data } = await axios.post("http://localhost:5432/getPlayers", {
          gameId: Number(gameId),
        });
        setPlayers(data);
        if (user) {
          let userId = user.id;
          setIsJoined(data.find((player) => player.userid === userId));
        }
        getPlayers();
      } catch {
        console.error();
      }
    }
    initialPlayers();
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
      const userId = user.id;
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
    let userId = Number(user.id);
    setStatus(value);
    try {
      const response = await axios.put(
        "http://localhost:5432/setPlayerStatus",
        { userId, value }
      );
      getPlayers();
      setStatus("Set Status");
    } catch {
      console.error();
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detailCon">
        <GameCard gameId={gameId} gameDetail={gameDetail} players={players} />
        {host ? (
          <div className="gameAction-con">
            <button
              onClick={() => setShowUpdateGame(true)}
              className="gameAction"
            >
              Update Game
            </button>

            <button onClick={() => setShowDelete(true)} className="gameAction">
              Delete
            </button>
          </div>
        ) : null}
        {isJoined ? (
          <div className="gameAction-con">
            <button onClick={() => leaveGame()} className="gameAction">
              Leave Game
            </button>

            <select
              name="playerStatus"
              id="playerStatus"
              className="gameAction"
              value={status}
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
      <PlayerList players={players} status={status} />

      {showUpdateGame && (
        <UpdateGame
          showUpdateGame={showUpdateGame}
          setShowUpdateGame={setShowUpdateGame}
          gameId={gameId}
          gameDetail={gameDetail}
        />
      )}
      {showDelete && (
        <ConfirmDelete
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          gameId={gameId}
        />
      )}
    </div>
  );
};

export default Game;
