import React from "react";
import { useFormik } from "formik";
import "./CreateGame.css";
import axios from "axios";

const CreateGame = () => {
  const formik = useFormik({
    initialValues: {
      venue: "",
      state: "",
      city: "",
      address: "",
      zipcode: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:5432/create",
          values
        );
        console.log(response.data);
      } catch {
        console.error();
      }
      resetForm({ values: "" });
    },
  });
  return (
    <div className="createGame-con">
      <form onSubmit={formik.handleSubmit}>
        <div className="createGame-inputs-con">
          <label htmlFor="venue">Venue:</label>

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
          <label htmlFor="state">State:</label>
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
          <label htmlFor="city">City:</label>
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
          <label htmlFor="address">Address:</label>
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
          <label htmlFor="zipcode">Zipcode:</label>
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
          <button type="submit" className="createGame-btn">
            Create Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGame;
