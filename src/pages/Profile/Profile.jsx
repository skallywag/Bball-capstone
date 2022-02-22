import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import "./Profile.scss";
import GameCard from "../../components/GameCard/GameCard";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [gameDetail, setGameDetail] = useState();
  const [players, setPlayers] = useState("");
  const [gameId, setGameId] = useState();
  // console.log(gameId);

  useEffect(() => {
    const userId = user.id;
    async function getCreatedGame() {
      const { data } = await axios.post("http://localhost:5432/userGame", {
        userId,
      });
      const response = await axios.post("http://localhost:5432/getPlayers", {
        gameId,
      });
      setPlayers(data);
      setGameDetail(data);
      setGameId(data.id);
    }
    getCreatedGame();
  }, []);

  const getPlayers = async () => {
    try {
    } catch {
      console.error();
    }
  };
  getPlayers();

  return (
    <div>
      <div className="dashboard-con">
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

      <h1>Your Game</h1>
      <GameCard gameDetail={gameDetail} players={players} />
    </div>
  );
};

export default Profile;
