import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Components
import GameCard from "../../components/GameCard/GameCard";
import UpdateGame from "../../components/UpdateGame/UpdateGame";
//
import { BsFillCameraFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import "./Profile.scss";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Local State
  const [gameDetail, setGameDetail] = useState();
  const [players, setPlayers] = useState("");
  const [gameId, setGameId] = useState();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const userId = user.id;
    async function getCreatedGame() {
      const { data } = await axios.post("http://localhost:5432/userGame", {
        userId,
      });
      setGameDetail(data);
      setGameId(data.id);
    }
    getCreatedGame();
    // setTimeout(() => {
    //   getPlayers();
    // }, 2000);
  }, [gameDetail]);

  // const getPlayers = async () => {
  //   try {
  //     const { data } = await axios.post("http://localhost:5432/getPlayers", {
  //       gameId,
  //     });
  //     setPlayers(data);
  //   } catch {
  //     console.error();
  //   }
  // };

  const deleteGame = async () => {
    try {
      await axios.delete(`http://localhost:5432/deleteGame/${gameId}`);
    } catch {
      console.error();
    }
  };

  return (
    <div>
      <div className="dashBoard-con">
        <div className="prof-card">
          <div className="prof-img-con">
            <BsFillCameraFill className="prof-img-icon"></BsFillCameraFill>
          </div>
          <div
            className="prof-info-con"
            style={{ color: "white", lineHeight: "25px" }}
          >
            <h2>{user.userName}</h2>
            <h1>{user.firstName}</h1>
            <h1>{user.email}</h1>
          </div>
        </div>
        <ul className="prof-actions">
          <Link
            to=""
            className="prof-link"
            onClick={() => alert("work in progress")}
          >
            <li className="img-action">Upload Image</li>
          </Link>
          <Link
            to=""
            className="prof-link"
            onClick={() => alert("work in progress")}
          >
            <li className="edit-action">Edit Profile</li>
          </Link>
        </ul>
      </div>

      <div className="gameCon">
        <span style={{ position: "absolute", top: "370px" }}>Your Game</span>
        <GameCard gameId={gameId} players={players} gameDetail={gameDetail} />
        {gameDetail ? (
          <div className="gameAction-con">
            <button
              className="gameAction"
              onClick={() => setShowUpdateModal(true)}
            >
              Update Game
            </button>
            <button className="gameAction" onClick={() => deleteGame()}>
              Delete
            </button>
          </div>
        ) : null}
      </div>

      {showUpdateModal && (
        <UpdateGame
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          gameDetail={gameDetail}
          gameId={gameId}
        />
      )}
    </div>
  );
};

export default Profile;
