import React from "react";
import Signup from "../../components/Sign-up/Signup";
import "./CreateAcc.css";
const backgrndImg = "https://wallpapercave.com/wp/wp7673086.jpg";

const CreateAcc = () => {
  return (
    <>
      <img className="backg-img" src={backgrndImg} alt="" />
      <Signup />
    </>
  );
};

export default CreateAcc;
