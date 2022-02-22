import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import "./UpdateGame.scss";

const UpdateGame = ({
  showUpdateModal,
  setShowUpdateModal,
  gameDetail,
  gameId,
}) => {
  // Local State
  const [gameUpdated, setGameUpdated] = useState("");
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userid = loggedUser.id;

  const formik = useFormik({
    initialValues: {
      venue: gameDetail.venue,
      state: gameDetail.state,
      city: gameDetail.city,
      address: gameDetail.address,
      zipcode: gameDetail.zipcode,
      skill: gameDetail.skill,
      agegroup: gameDetail.agegroup,
      duration: gameDetail.duration,
      userid,
      gameId,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `http://localhost:5432/updateGame/`,
          values
        );
        // setGameUpdated("Game Updated!");
        setShowUpdateModal(false);
      } catch {
        console.error();
      }
      resetForm({ values: "" });
    },
  });
  return (
    <div className={`overlay ${showUpdateModal ? "show" : "hide"}`}>
      <div className="update-con">
        <AiFillCloseCircle
          className="close-update"
          onClick={() => setShowUpdateModal(false)}
        />

        {gameUpdated ? (
          <span className="gameCreated">{gameUpdated}</span>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <div className="createGame-inputs-con">
            <label className="createLabel" htmlFor="venue">
              Venue:
            </label>

            <div className="createGame-input-con">
              <input
                value={formik.values.venue}
                onChange={formik.handleChange}
                type="text"
                placeholder="Venue/Gym"
                name="venue"
                className="createGame-input"
              />
            </div>
            <label className="createLabel" htmlFor="state">
              State:
            </label>
            <div className="createGame-input-con">
              <input
                value={formik.values.state}
                onChange={formik.handleChange}
                type="text"
                placeholder="State"
                name="state"
                className="createGame-input"
              />
            </div>
            <label className="createLabel" htmlFor="city">
              City:
            </label>
            <div className="createGame-input-con">
              <input
                value={formik.values.city}
                onChange={formik.handleChange}
                type="text"
                placeholder="City"
                name="city"
                className="createGame-input"
              />
            </div>
            <label className="createLabel" htmlFor="address">
              Address:
            </label>
            <div className="createGame-input-con">
              <input
                value={formik.values.address}
                onChange={formik.handleChange}
                type="text"
                placeholder="Address"
                name="address"
                className="createGame-input"
              />
            </div>
            <label className="createLabel" htmlFor="zipcode">
              Zipcode:
            </label>
            <div className="createGame-input-con">
              <input
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                type="text"
                placeholder="Zipcode"
                name="zipcode"
                className="createGame-input"
              />
            </div>

            <label className="createLabel" htmlFor="skill">
              Skill Level:
            </label>
            <div className="createGame-input-con">
              <select
                name="skill"
                value={formik.values.skill}
                onChange={formik.handleChange}
                className="createGame-input"
              >
                <option value="" label="Select Skill" />
                <option value="any" label="any" />
                <option value="casual" label="casual" />
                <option value="novice" label="novice" />
                <option value="intermediate" label="intermediate" />
                <option value="advanced" label="advanced" />
              </select>
            </div>
            <label className="createLabel" htmlFor="age">
              Age Group:
            </label>
            <div className="createGame-input-con">
              <select
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                className="createGame-input"
              >
                <option value="" label="Age group" />
                <option value="any" label="any" />
                <option value="16-18" label="16-18" />
                <option value="18-21" label="18-21" />
                <option value="21-30" label="21-30" />
                <option value="30+" label="30+" />
              </select>
            </div>
            <label className="createLabel" htmlFor="duration">
              Game Duration:
            </label>
            <div className="createGame-input-con">
              <select
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                className="createGame-input"
              >
                <option value="" label="Duration" />
                <option value="any" label="any" />
                <option value="30" label="30min" />
                <option value="60" label="60min" />
                <option value="120" label="120min" />
              </select>
            </div>

            <button type="submit" className="createGame-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGame;
