import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import "./Profile.scss";
// import GameDetail from "../GameDetail/GameDetail";
// import PlayerList from "../../components/PlayerList/PlayerList";
import axios from "axios";

const Profile = () => {
  const [usersGame, setUsersGame] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userId = user.id;
    async function getCreatedGame() {
      const response = await axios.post("http://localhost:5432/userGame", {
        userId,
      });
      const data = response.data;
      setUsersGame(data);
      console.log(data);
    }
    getCreatedGame();
  }, []);

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
      <div>
        <div>Your Game</div>
      </div>
    </div>
  );
};

export default Profile;
