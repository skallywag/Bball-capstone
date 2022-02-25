import React from "react";
import "./ConfirmDelete.scss";

const ConfirmDelete = ({ showDelete, setShowDelete }) => {
  return (
    <div className={`overlay ${showDelete ? "show" : "hide"}`}>
      <div className="delete-con">
        <h1
          className="deleteTitle"
          style={{ fontSize: "40px", color: "white" }}
        >
          Delete Game?
        </h1>
        <button className="gameAction">Yes</button>
        <button onClick={() => setShowDelete(false)} className="gameAction">
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
