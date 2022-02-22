import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const GameCard = ({ players, gameDetail }) => {
  return (
    <div className="detailCon">
      {gameDetail ? (
        <div className="detailCard">
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
    </div>
  );
};

export default GameCard;