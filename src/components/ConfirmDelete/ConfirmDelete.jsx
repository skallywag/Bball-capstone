import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ConfirmDelete.scss";

const ConfirmDelete = ({ showDelete, setShowDelete, gameId }) => {
  const [deleted, setDeleted] = useState("");
  const navigate = useNavigate();

  const handleDeleteGame = async () => {
    try {
      const response = await axios.delete(`/deleteGame/${gameId}`);
      setDeleted("Game Deleted!");
      localStorage.removeItem("gameId");
      setTimeout(() => {
        setShowDelete(false);
        navigate("/");
      }, 1500);
    } catch {
      console.error();
    }
  };

  return (
    <div className={`overlay ${showDelete ? "show" : "hide"}`}>
      <div className="delete-con">
        {deleted && (
          <span
            style={{
              fontSize: "30px",
              marginBottom: "10px",
              color: "whitesmoke",
            }}
          >
            {deleted}
          </span>
        )}
        <h1
          className="deleteTitle"
          style={{ fontSize: "40px", color: "white" }}
        >
          Delete Game?
        </h1>

        <button onClick={() => handleDeleteGame()} className="gameAction">
          Yes
        </button>
        <button onClick={() => setShowDelete(false)} className="gameAction">
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
