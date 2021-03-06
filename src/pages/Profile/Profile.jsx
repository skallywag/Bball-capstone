import React from "react";
import { Link } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import "./Profile.scss";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const gameId = JSON.parse(localStorage.getItem("gameId"));

  return (
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
      <div>
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
        <div>
          {gameId && (
            <Link
              to={`/gameDetail/?gameId=${gameId}`}
              className="gameAction"
              style={{ textDecoration: "none" }}
            >
              Your Game
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
