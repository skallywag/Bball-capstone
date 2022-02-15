import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
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
      <div className="prof-actions">
        <Link to="" className="edit-link">
          Edit Profile
        </Link>
        <Link to="" className="edit-link">
          Upload image
        </Link>
      </div>
    </div>
  );
};

export default Profile;